import os
import json

def get_model_version(models_dir: str) -> str:
    metadata_path = os.path.join(models_dir, "model_metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, "r") as f:
            metadata = json.load(f)
            return metadata.get("version", "unknown")
    return "unknown"
