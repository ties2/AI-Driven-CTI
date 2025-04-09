import React from 'react';
import { AlertTriangle, Shield, AlertCircle } from 'lucide-react';
import { RiskAnalysis } from '../types/cti';

interface RiskSummaryProps {
  data: RiskAnalysis[];
}

export const RiskSummary: React.FC<RiskSummaryProps> = ({ data }) => {
  const getThreatIcon = (threatType: string) => {
    switch (threatType.toLowerCase()) {
      case 'phishing':
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case 'malware':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Shield className="w-6 h-6 text-blue-500" />;
    }
  };

  const getRiskLevel = (predictedRisk: number): string => {
    if (predictedRisk >= 0.7) return 'High';
    if (predictedRisk >= 0.4) return 'Medium';
    return 'Low';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <div key={item.threatType} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            {getThreatIcon(item.threatType)}
            <h3 className="text-lg font-semibold capitalize">{item.threatType}</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Risk Level: <span className="font-semibold">{getRiskLevel(item.predictedRisk)}</span>
            </p>
            <p className="text-gray-600">
              High Risk Incidents: <span className="font-semibold">{item.highRiskCount}</span>
            </p>
            <p className="text-gray-600">
              Average Severity: <span className="font-semibold">{item.avgSeverity.toFixed(1)}/10</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};