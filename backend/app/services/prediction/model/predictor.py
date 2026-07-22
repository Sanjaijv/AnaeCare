import numpy as np

class Predictor:
    def __init__(self, model):
        self.model = model
        
    def predict(self, feature_vector: list) -> int:
        X = np.array(feature_vector).reshape(1, -1)
        # Assuming model outputs 0, 1, 2 for Low, Moderate, High
        pred = self.model.predict(X)
        return int(pred[0])
        
    def predict_proba(self, feature_vector: list) -> list:
        X = np.array(feature_vector).reshape(1, -1)
        proba = self.model.predict_proba(X)
        return proba[0].tolist()
