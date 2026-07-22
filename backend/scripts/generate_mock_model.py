import os
import json
import pickle
import numpy as np
from sklearn.datasets import make_classification
from xgboost import XGBClassifier

# Constants
MODELS_DIR = os.path.join(os.path.dirname(__file__), "../app/models")
MODEL_PATH = os.path.join(MODELS_DIR, "xgboost_model.pkl")
SCHEMA_PATH = os.path.join(MODELS_DIR, "feature_schema.json")
METADATA_PATH = os.path.join(MODELS_DIR, "model_metadata.json")

# Features to match previous phases (RGB, HSV, LAB, Redness, etc.)
FEATURES = [
    "redness_index", "paleness_index", "erythema_index",
    "rgb_r_mean", "rgb_g_mean", "rgb_b_mean",
    "hsv_h_mean", "hsv_s_mean", "hsv_v_mean",
    "lab_l_mean", "lab_a_mean", "lab_b_mean",
    "contrast", "energy", "homogeneity", "correlation"
]

def generate_mock_model():
    os.makedirs(MODELS_DIR, exist_ok=True)

    print("Generating synthetic data...")
    # Generate random data for 3 classes (Low, Moderate, High risk)
    X, y = make_classification(
        n_samples=1000, 
        n_features=len(FEATURES), 
        n_informative=8, 
        n_classes=3, 
        random_state=42
    )

    print("Training mock XGBoost model...")
    model = XGBClassifier(
        n_estimators=100, 
        random_state=42, 
        use_label_encoder=False, 
        eval_metric='mlogloss'
    )
    model.fit(X, y)

    print(f"Saving model to {MODEL_PATH}...")
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(model, f)

    print("Generating schema and metadata...")
    schema = {
        "version": "1.0",
        "features": FEATURES,
        "featureCount": len(FEATURES)
    }
    with open(SCHEMA_PATH, "w") as f:
        json.dump(schema, f, indent=4)

    metadata = {
        "modelName": "AnaeCare XGBoost Inference Model",
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

    print("Mock model generation complete!")

if __name__ == "__main__":
    generate_mock_model()
