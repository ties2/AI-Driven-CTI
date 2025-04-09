import * as tf from '@tensorflow/tfjs';
import { CTIEvent, RiskAnalysis } from '../types/cti';

// Convert threat types to numerical values
const threatTypeToNumber = (threatType: string): number => {
  const types = ['phishing', 'malware', 'recon'];
  return types.indexOf(threatType);
};

// Normalize severity scores
const normalizeSeverity = (severity: number): number => {
  return severity / 10;
};

// Prepare data for TensorFlow.js
const prepareData = (events: CTIEvent[]): [tf.Tensor2d, tf.Tensor1d] => {
  const features = events.map(event => [
    threatTypeToNumber(event.threatType),
    normalizeSeverity(event.severity)
  ]);
  
  const labels = events.map(event => event.severity >= 7 ? 1 : 0);

  return [
    tf.tensor2d(features),
    tf.tensor1d(labels)
  ];
};

// Create and train the model
const createModel = (): tf.Sequential => {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 4,
    activation: 'relu',
    inputShape: [2]
  }));
  
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));

  model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
};

// Analyze risks using ML
export const analyzeRisks = async (events: CTIEvent[]): Promise<RiskAnalysis[]> => {
  const [features, labels] = prepareData(events);
  const model = createModel();

  // Train the model
  await model.fit(features, labels, {
    epochs: 100,
    verbose: 0
  });

  // Get predictions
  const predictions = model.predict(features) as tf.Tensor;
  const predictionValues = await predictions.data();

  // Group and analyze results
  const analysis = events.reduce((acc: { [key: string]: any }, event, index) => {
    if (!acc[event.threatType]) {
      acc[event.threatType] = {
        count: 0,
        severitySum: 0,
        highRiskCount: 0,
        predictedRiskSum: 0
      };
    }

    acc[event.threatType].count++;
    acc[event.threatType].severitySum += event.severity;
    acc[event.threatType].highRiskCount += predictionValues[index] >= 0.5 ? 1 : 0;
    acc[event.threatType].predictedRiskSum += predictionValues[index];

    return acc;
  }, {});

  // Format results
  return Object.entries(analysis).map(([threatType, data]: [string, any]): RiskAnalysis => ({
    threatType,
    highRiskCount: data.highRiskCount,
    avgSeverity: data.severitySum / data.count,
    predictedRisk: data.predictedRiskSum / data.count
  }));
};