export interface CTIEvent {
  id: number;
  threatType: string;
  sourceIP: string;
  timestamp: string;
  severity: number;
  description: string;
}

export interface RiskAnalysis {
  threatType: string;
  highRiskCount: number;
  avgSeverity: number;
  predictedRisk: number;
}