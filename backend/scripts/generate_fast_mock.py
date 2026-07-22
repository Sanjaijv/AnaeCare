import os
import json
import pickle

MODELS_DIR = os.path.join(os.path.dirname(__file__), "../app/models")
MODEL_PATH = os.path.join(MODELS_DIR, "xgboost_model.pkl")
SCHEMA_PATH = os.path.join(MODELS_DIR, "feature_schema.json")
METADATA_PATH = os.path.join(MODELS_DIR, "model_metadata.json")

FEATURES = [
    "redness_index", "paleness_index", "erythema_index",
    "rgb_r_mean", "rgb_g_mean", "rgb_b_mean",
    "hsv_h_mean", "hsv_s_mean", "hsv_v_mean",
    "lab_l_mean", "lab_a_mean", "lab_b_mean",
    "contrast", "energy", "homogeneity", "correlation"
]

class MockModel:
    def predict(self, X):
        import numpy as np
        return np.array([2]) # Always return High risk
        
    def predict_proba(self, X):
        import numpy as np
        return np.array([[0.1, 0.2, 0.7]]) # High risk probabilities

def generate_fast_mock():
    os.makedirs(MODELS_DIR, exist_ok=True)
    
    print("Saving fast mock model...")
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(MockModel(), f)
        
    print("Generating schema and metadata...")
    schema = {
        "version": "1.0",
        "features": FEATURES,
        "featureCount": len(FEATURES)
    }
    with open(SCHEMA_PATH, "w") as f:
        json.dump(schema, f, indent=4)

    metadata = {
        "modelName": "AnaeCare XGBoost Inference Model (Mock)",
        "version": "1.0.0",
        "trainingDate": "2026-07-13",
        "datasetVersion": "v1.0-mock",
        "featureCount": len(FEATURES),
        "metrics": {
            "accuracy": 0.95,
            "precision": 0.94,
            "recall": 0.96,
            "f1Score": 0.95
        }
    }
    with open(METADATA_PATH, "w") as f:
        json.dump(metadata, f, indent=4)

    print("Fast mock generation complete!")

if __name__ == "__main__":
    generate_fast_mock()
