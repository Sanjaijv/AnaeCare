export interface PredictionHistory {
  id: string;
  userId: string;
  timestamp: string;
  createdAt: string;
  riskLevel: string;
  confidence: number;
  predictionSummary: string;
  imagePath?: string;
  processingTime: number;
  modelVersion: string;
  explanation?: string;
  dietRecommendation?: string;
}

export interface HistoryStatistics {
  totalScans: number;
  highestConfidence: number;
  averageConfidence: number;
  lowRiskPercent: number;
  moderateRiskPercent: number;
  highRiskPercent: number;
  latestScan?: string;
  firstScan?: string;
  mostCommonRisk?: string;
}

export interface TimelineEntry {
  predictionId: string;
  timestamp: string;
  riskLevel: string;
  confidence: number;
  modelVersion: string;
}

export interface HistoryResponse {
  success: boolean;
  predictions: PredictionHistory[];
  statistics: HistoryStatistics;
  timeline: TimelineEntry[];
  error?: string;
}
