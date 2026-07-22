import os
import json

class Validator:
    def __init__(self, models_dir: str):
        schema_path = os.path.join(models_dir, "feature_schema.json")
        if not os.path.exists(schema_path):
            raise FileNotFoundError(f"Feature schema not found at {schema_path}")
        
        with open(schema_path, "r") as f:
            self.schema = json.load(f)
            
    def validate(self, feature_vector: list) -> bool:
        if not isinstance(feature_vector, list):
            raise ValueError("Feature vector must be a list.")
        
        expected_count = self.schema.get("featureCount", 0)
        if len(feature_vector) != expected_count:
            raise ValueError(f"Feature vector length mismatch. Expected {expected_count}, got {len(feature_vector)}.")
            
        import math
        for idx, val in enumerate(feature_vector):
            if val is None or math.isnan(val) or math.isinf(val):
                raise ValueError(f"Invalid value at index {idx}: {val}")
                
        return True
