# Feature 11 - AI Prediction Engine

## Objective

Implement the AI Prediction Engine responsible for analyzing the extracted conjunctiva features and predicting the user's anemia risk.

The prediction engine receives the normalized feature vector generated during Feature Extraction and performs inference using a trained machine learning model.

The engine should return:

- Risk Classification
- Confidence Score
- Probability Distribution
- Explainable AI (Feature Importance)
- Model Metadata

This module does not generate diet recommendations or save prediction history.

---

# Goals

- Load trained ML model.
- Validate feature vector.
- Perform AI inference.
- Calculate prediction confidence.
- Generate probability scores.
- Explain prediction.
- Return standardized prediction response.

---

# Pipeline Position

```
Camera

↓

Image Quality Assessment

↓

Image Preprocessing

↓

Conjunctiva Detection

↓

Feature Extraction

↓

AI Prediction Engine

↓

Prediction Result
```

---

# Functional Requirements

The system shall

- Load the trained model.
- Validate feature vector.
- Run inference.
- Calculate prediction confidence.
- Generate probability distribution.
- Generate explanation.
- Return structured prediction response.

---

# Model Selection

Primary Model

```
XGBoost
```

Future Models

- Random Forest
- LightGBM
- CatBoost
- EfficientNet
- MobileNet
- Ensemble Models

---

# Folder Structure

```
backend/

app/

services/

prediction/

prediction_service.py

pipeline/

prediction_pipeline.py

model/

model_loader.py

predictor.py

confidence.py

probability.py

explainability.py

validator.py

version.py

routers/

prediction.py

schemas/

prediction.py

models/

xgboost_model.pkl

feature_schema.json

model_metadata.json

mobile/

screens/

Prediction/

PredictionProcessingScreen.tsx

components/

prediction/

PredictionAnimation.tsx

ConfidenceCard.tsx

RiskIndicator.tsx

ProbabilityChart.tsx
```

---

# Prediction Pipeline

```
Feature Vector

↓

Feature Validation

↓

Model Loading

↓

Inference

↓

Probability Calculation

↓

Confidence Calculation

↓

Explainability

↓

Prediction Response
```

---

# Step 1

Feature Validation

Verify

- Feature Count
- Missing Values
- NaN Values
- Infinite Values
- Schema Version

Reject invalid vectors.

---

# Step 2

Model Loading

Load

```
xgboost_model.pkl
```

The model should load once during backend startup.

Never reload for every request.

---

# Step 3

Prediction

Perform

```
predict()

predict_proba()
```

---

# Step 4

Risk Classification

Return

```
Low Risk
```

```
Moderate Risk
```

```
High Risk
```

---

# Step 5

Probability Scores

Example

```
Low

12%

Moderate

24%

High

64%
```

---

# Step 6

Confidence Score

Calculate

```
Highest Probability

↓

Confidence
```

Example

```
91%
```

---

# Step 7

Explainable AI

Use

```
SHAP
```

Generate

Top contributing features.

Example

```
High Redness Index

↓

Positive Contribution

Low Brightness

↓

Negative Contribution
```

---

# Backend API

POST

```
/api/v1/prediction/predict
```

Input

```json
{
    "featureVector":[...]
}
```

Output

```json
{
    "success": true,
    "prediction": {
        "risk": "High",
        "confidence": 0.91,
        "probabilities": {
            "low": 0.05,
            "moderate": 0.14,
            "high": 0.81
        },
        "explanation": [
            {
                "feature": "Redness Index",
                "impact": "High"
            },
            {
                "feature": "LAB A Channel",
                "impact": "Medium"
            }
        ]
    },
    "processingTime": 0.18,
    "modelVersion": "1.0.0"
}
```

---

# Frontend Screen

## PredictionProcessingScreen

Purpose

Display AI inference progress.

Animation

```
Preparing Features...

↓

Running AI Model...

↓

Calculating Confidence...

↓

Generating Explanation...

↓

Completed
```

---

# Components

## PredictionAnimation

Displays current inference stage.

---

## ConfidenceCard

Displays

```
Confidence

91%
```

---

## RiskIndicator

Displays

- Low
- Moderate
- High

using color-coded indicators.

---

## ProbabilityChart

Displays probability distribution.

Example

```
Low

████ 10%

Moderate

██████ 20%

High

██████████████ 70%
```

---

# State Management

Redux Slice

```
prediction

↓

loading

status

risk

confidence

probabilities

explanation

processingTime

modelVersion

error
```

---

# Model Metadata

Store

```
Model Name

Version

Training Date

Dataset Version

Feature Count

Accuracy

Precision

Recall

F1 Score
```

---

# Error Handling

Handle

- Missing model.
- Invalid feature vector.
- Feature mismatch.
- Prediction timeout.
- Corrupted model.
- Backend unavailable.

Return user-friendly messages.

---

# Performance

Target

```
Prediction

< 500 ms
```

Total API

```
< 2 seconds
```

---

# Validation Rules

- Feature count matches schema.
- Model exists.
- Model version supported.
- Confidence between 0–100%.
- Prediction class valid.

---

# Acceptance Criteria

The feature is complete when

- Model loads successfully.
- Feature vector validation works.
- AI prediction executes.
- Risk classification is returned.
- Confidence score is generated.
- Probability distribution is returned.
- SHAP explanation is generated.
- API response matches schema.
- Frontend displays prediction progress.

---

# Testing Checklist

- Test valid feature vectors.
- Test invalid feature vectors.
- Test missing model.
- Test corrupted model.
- Test prediction latency.
- Verify confidence score.
- Verify probability distribution.
- Verify SHAP explanations.
- Verify model metadata.

---

# Deliverables

- Prediction API
- Prediction Service
- Model Loader
- Feature Validator
- Probability Calculator
- Confidence Calculator
- Explainability Module
- PredictionProcessingScreen
- Redux Prediction State

---

# Out of Scope

This feature does NOT include

- Prediction Result UI
- Diet Recommendations
- Health History
- Doctor Consultation
- Database Storage

---

# Future Enhancements

- Ensemble models
- TensorFlow Lite on-device inference
- Confidence calibration
- Active learning
- Online model updates
- Multi-model voting

---

# Next Feature

## Feature 12 - Prediction Results

Implement

- Prediction Result Screen
- Risk Visualization
- Explainable AI Display
- Health Summary
- Next Steps
- Continue to Diet Recommendations
- Save Prediction
- Share Result