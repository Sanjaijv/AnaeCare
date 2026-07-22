import numpy as np
from typing import List

def normalize_features(features: List[float], method: str = "min-max") -> List[float]:
    """Normalize a feature vector."""
    if not features:
        return []
        
    arr = np.array(features, dtype=np.float32)
    
    if method == "min-max":
        min_val = np.min(arr)
        max_val = np.max(arr)
        if max_val - min_val == 0:
            return arr.tolist()
        normalized = (arr - min_val) / (max_val - min_val)
        return normalized.tolist()
        
    elif method == "standard":
        mean_val = np.mean(arr)
        std_val = np.std(arr)
        if std_val == 0:
            return arr.tolist()
        normalized = (arr - mean_val) / std_val
        return normalized.tolist()
        
    return features
