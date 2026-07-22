from typing import List

from ...schemas.history import PredictionHistory, TimelineEntry

class TimelineService:
    def generate_timeline(self, history: List[PredictionHistory]) -> List[TimelineEntry]:
        timeline = []
        for p in history:
            timeline.append(
                TimelineEntry(
                    predictionId=p.id,
                    timestamp=p.timestamp,
                    riskLevel=p.riskLevel,
                    confidence=p.confidence,
                    modelVersion=p.modelVersion
                )
            )
        # Assuming history is already sorted descending, but let's make sure timeline is descending too
        timeline.sort(key=lambda x: x.timestamp, reverse=True)
        return timeline
