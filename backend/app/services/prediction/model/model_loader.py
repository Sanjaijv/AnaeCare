import os
import pickle
import numpy as np

class MockModel:
    def predict(self, X):
        return np.array([2]) # Always return High risk
        
    def predict_proba(self, X):
        return np.array([[0.1, 0.2, 0.7]]) # High risk probabilities

class ModelLoader:
    _instance = None
    
    def __new__(cls, models_dir: str):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
            cls._instance._load_model(models_dir)
        return cls._instance
        
    def _load_model(self, models_dir: str):
        model_path = os.path.join(models_dir, "xgboost_model.pkl")
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
            
        try:
            with open(model_path, "rb") as f:
                self.model = pickle.load(f)
        except AttributeError:
            # If it was generated as a fast mock from __main__, use our MockModel
            self.model = MockModel()
            
    def get_model(self):
        return self.model
