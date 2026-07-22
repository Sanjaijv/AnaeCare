def calculate_probabilities(proba_list: list) -> dict:
    if len(proba_list) != 3:
        # Fallback if model doesn't output exactly 3 classes
        return {
            "low": 0.33,
            "moderate": 0.33,
            "high": 0.34
        }
        
    return {
        "low": round(proba_list[0], 2),
        "moderate": round(proba_list[1], 2),
        "high": round(proba_list[2], 2)
    }

def calculate_confidence(probabilities: dict) -> float:
    # Confidence is simply the max probability scaled to 100
    max_prob = max(probabilities.values())
    return round(max_prob * 100, 2)
