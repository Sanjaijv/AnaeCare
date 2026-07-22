import os
from .pipeline.prediction_pipeline import PredictionPipeline
from .model.version import get_model_version

# Initialize pipeline lazily or globally
# For simplicity, we initialize it globally when module loads
MODELS_DIR = os.path.join(os.path.dirname(__file__), "../../models")
_pipeline = None

def get_pipeline():
    global _pipeline
    if _pipeline is None:
        _pipeline = PredictionPipeline(MODELS_DIR)
    return _pipeline

async def process_prediction(feature_vector: list):
    """
    Service function to handle prediction request.
    """
    pipeline = get_pipeline()
    result = pipeline.run(feature_vector)
    model_version = get_model_version(MODELS_DIR)
    return result, model_version
