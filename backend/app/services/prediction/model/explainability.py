try:
    import shap
    SHAP_AVAILABLE = True
except ImportError:
    SHAP_AVAILABLE = False
import numpy as np

class Explainer:
    def __init__(self, model, schema):
        self.model = model
        self.feature_names = schema.get("features", [])
        self.explainer = None
        if SHAP_AVAILABLE:
            try:
                # We use TreeExplainer for XGBoost
                self.explainer = shap.TreeExplainer(self.model)
            except Exception as e:
                print(f"Warning: Failed to initialize SHAP explainer: {e}")
            self.explainer = None
            
    def explain(self, feature_vector: list) -> list:
        if not self.explainer:
            return []
            
        X = np.array(feature_vector).reshape(1, -1)
        try:
            shap_values = self.explainer.shap_values(X)
            # shap_values could be a list if it's multiclass
            if isinstance(shap_values, list):
                # For simplicity, get the shap values for the predicted class
                # But since we just want general impact, we can sum magnitudes
                vals = np.abs(np.array(shap_values)).sum(axis=0)[0]
            else:
                vals = shap_values[0]
                
            explanations = []
            for i, val in enumerate(vals):
                impact = "High" if abs(val) > 0.5 else "Medium" if abs(val) > 0.1 else "Low"
                name = self.feature_names[i] if i < len(self.feature_names) else f"Feature {i}"
                explanations.append({
                    "feature": name,
                    "impact": impact,
                    "shapValue": float(val)
                })
                
            # Sort by absolute SHAP value descending
            explanations.sort(key=lambda x: abs(x["shapValue"]), reverse=True)
            return explanations[:5] # Return top 5
        except Exception as e:
            print(f"SHAP explanation failed: {e}")
            return []
