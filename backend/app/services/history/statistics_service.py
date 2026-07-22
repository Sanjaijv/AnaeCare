from typing import List
from datetime import datetime

from ...schemas.history import PredictionHistory, HistoryStatistics

class StatisticsService:
    def calculate_statistics(self, history: List[PredictionHistory]) -> HistoryStatistics:
        total_scans = len(history)
        if total_scans == 0:
            return HistoryStatistics(
                totalScans=0,
                highestConfidence=0.0,
                averageConfidence=0.0,
                lowRiskPercent=0.0,
                moderateRiskPercent=0.0,
                highRiskPercent=0.0,
                latestScan=None,
                firstScan=None,
                mostCommonRisk=None
            )

        highest_confidence = max((p.confidence for p in history), default=0.0)
        average_confidence = sum(p.confidence for p in history) / total_scans
        
        low_count = sum(1 for p in history if p.riskLevel.lower() == 'low')
        mod_count = sum(1 for p in history if p.riskLevel.lower() == 'moderate')
        high_count = sum(1 for p in history if p.riskLevel.lower() == 'high')

        risk_counts = {'Low': low_count, 'Moderate': mod_count, 'High': high_count}
        most_common = max(risk_counts, key=risk_counts.get) if any(risk_counts.values()) else None

        # history is typically sorted descending, so first element is latest, last is first
        latest_scan = history[0].timestamp if history else None
        first_scan = history[-1].timestamp if history else None

        return HistoryStatistics(
            totalScans=total_scans,
            highestConfidence=round(highest_confidence, 2),
            averageConfidence=round(average_confidence, 2),
            lowRiskPercent=round((low_count / total_scans) * 100, 1),
            moderateRiskPercent=round((mod_count / total_scans) * 100, 1),
            highRiskPercent=round((high_count / total_scans) * 100, 1),
            latestScan=latest_scan,
            firstScan=first_scan,
            mostCommonRisk=most_common
        )
