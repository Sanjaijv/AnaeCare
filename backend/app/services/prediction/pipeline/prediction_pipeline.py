from ..model.validator import Validator
from ..model.model_loader import ModelLoader
from ..model.predictor import Predictor
from ..model.explainability import Explainer
from ..model.probability_confidence import calculate_probabilities, calculate_confidence

class PredictionPipeline:
    def __init__(self, models_dir: str):
        self.models_dir = models_dir
        self.validator = Validator(models_dir)
        self.loader = ModelLoader(models_dir)
        
        model = self.loader.get_model()
        self.predictor = Predictor(model)
        self.explainer = Explainer(model, self.validator.schema)
        
    def run(self, feature_vector: list):
        # 1. Validate
        self.validator.validate(feature_vector)
        
        # 2. Predict Risk Class
        pred_class_idx = self.predictor.predict(feature_vector)
        classes = ["Low Risk", "Moderate Risk", "High Risk"]
        risk_class = classes[pred_class_idx] if 0 <= pred_class_idx < len(classes) else "Unknown"
        
        # 3. Calculate Probabilities
        proba_list = self.predictor.predict_proba(feature_vector)
        probabilities = calculate_probabilities(proba_list)
        
        # 4. Calculate Confidence
        confidence = calculate_confidence(probabilities)
        
        # 5. Explainability
        explanation = self.explainer.explain(feature_vector)
        
        return {
            "risk": risk_class,
            "confidence": confidence,
            "probabilities": probabilities,
            "explanation": explanation
        }
