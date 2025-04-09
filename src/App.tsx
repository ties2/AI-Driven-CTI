import React, { useEffect, useState } from 'react';
import { AlertOctagon } from 'lucide-react';
import { RiskChart } from './components/RiskChart';
import { RiskSummary } from './components/RiskSummary';
import { mockCTIData } from './data/mockData';
import { analyzeRisks } from './utils/mlAnalysis';
import type { RiskAnalysis } from './types/cti';

function App() {
  const [analysis, setAnalysis] = useState<RiskAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performAnalysis = async () => {
      try {
        const results = await analyzeRisks(mockCTIData);
        setAnalysis(results);
      } catch (error) {
        console.error('Error analyzing risks:', error);
      } finally {
        setLoading(false);
      }
    };

    performAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing threat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-8 h-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-800">CTI Risk Analysis Dashboard</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Advanced machine learning analysis of potential security threats
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Risk Overview</h2>
          <RiskChart data={analysis} />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Detailed Analysis</h2>
          <RiskSummary data={analysis} />
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          <div className="space-y-3">
            <p className="text-gray-600">Based on the analysis, we recommend:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Enable Multi-Factor Authentication across all systems</li>
              <li>Conduct regular security awareness training</li>
              <li>Update security policies and incident response plans</li>
              <li>Implement network segmentation and access controls</li>
              <li>Regular backup and disaster recovery testing</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;