# Feature 10 - Feature Extraction

## Objective

Implement the Feature Extraction module to analyze the extracted conjunctiva Region of Interest (ROI) and generate numerical features that represent its color, intensity, texture, and statistical properties.

These features will serve as the input to the AI Prediction Engine for anemia risk classification.

This phase focuses only on extracting meaningful features from the conjunctiva image. No prediction or classification is performed.

---

# Goals

- Extract color features.
- Extract statistical features.
- Extract texture features.
- Calculate redness and paleness indices.
- Generate a normalized feature vector.
- Validate extracted features.
- Prepare data for AI inference.

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

AI Prediction
```

---

# Functional Requirements

The system shall

- Accept a validated conjunctiva ROI.
- Convert the ROI into multiple color spaces.
- Extract numerical color features.
- Calculate texture descriptors.
- Normalize all extracted features.
- Generate a feature vector.
- Store feature metadata.
- Pass the feature vector to the AI model.

---

# Folder Structure

```
backend/

app/

services/

feature_extraction/

feature_service.py

extractors/

rgb_features.py

hsv_features.py

lab_features.py

redness.py

paleness.py

brightness.py

texture.py

statistics.py

normalization.py

pipeline.py

routers/

features.py

schemas/

features.py

mobile/

screens/

FeatureExtraction/

FeatureExtractionScreen.tsx

components/

feature/

ExtractionAnimation.tsx

FeatureSummary.tsx

FeatureProgress.tsx
```

---

# Feature Extraction Pipeline

```
ROI Image

↓

RGB Analysis

↓

HSV Analysis

↓

LAB Analysis

↓

Redness Index

↓

Paleness Index

↓

Brightness Analysis

↓

Texture Analysis

↓

Statistical Analysis

↓

Feature Normalization

↓

Feature Vector
```

---

# Color Features

## RGB

Extract

- Mean Red
- Mean Green
- Mean Blue
- Standard Deviation

---

## HSV

Extract

- Hue
- Saturation
- Value

---

## LAB

Extract

- L
- A
- B

Reason

LAB color space is more stable under lighting changes.

---

# Redness Index

Purpose

Estimate blood perfusion.

Possible Formula

```
Red / (Red + Green + Blue)
```

Output

```
0.0

↓

1.0
```

---

# Paleness Index

Purpose

Estimate conjunctival paleness.

Possible Formula

Based on

- LAB
- Brightness
- Red channel intensity

Output

Normalized value.

---

# Brightness Analysis

Extract

- Mean Brightness
- Brightness Variance

---

# Texture Features

Method

GLCM

Extract

- Contrast
- Correlation
- Energy
- Homogeneity

---

Method

LBP

Extract

- Local Binary Pattern Histogram

---

# Statistical Features

Calculate

- Mean
- Median
- Variance
- Standard Deviation
- Entropy
- Skewness
- Kurtosis

---

# Feature Normalization

Normalize

All numerical features.

Methods

- Min-Max Scaling
- Standard Scaling

Store normalization parameters.

---

# Feature Vector

Example

```
[

0.62,

0.51,

0.74,

0.39,

...

]

```

Expected Size

Approximately

```
30–100 Features
```

depending on the final model.

---

# Backend API

POST

```
/api/v1/features/extract
```

Input

ROI Image

Output

```json
{
  "success": true,
  "featureCount": 42,
  "processingTime": 0.73,
  "features": {
    "redness": 0.64,
    "paleness": 0.31,
    "brightness": 0.58,
    "texture": {
      "contrast": 0.22,
      "energy": 0.81
    }
  }
}
```

---

# Frontend Screen

## FeatureExtractionScreen

Purpose

Visualize feature extraction.

Components

- Processing Animation
- Progress Indicator
- Feature Summary
- Continue Button

This screen is primarily for development/debugging and can be hidden in production.

---

# Components

## ExtractionAnimation

Display

```
Analyzing Colors...

↓

Extracting Texture...

↓

Generating Feature Vector...
```

---

## FeatureSummary

Display

- Redness
- Paleness
- Brightness
- Texture Score

---

## FeatureProgress

Display

Current extraction stage.

---

# State Management

Redux Slice

```
features

↓

loading

status

featureVector

summary

processingTime

error
```

---

# Error Handling

Handle

- Invalid ROI
- Empty image
- Feature extraction failure
- Unsupported format
- Processing timeout

Display meaningful messages.

---

# Performance

Target

```
< 2 seconds
```

Avoid repeated color space conversions.

---

# Validation Rules

- ROI must exist.
- ROI resolution must be ≥ 128×128.
- Color channels must be valid.
- Feature vector must contain no NaN values.
- All normalized values must be finite.

---

# Acceptance Criteria

The feature is complete when

- RGB features are extracted.
- HSV features are extracted.
- LAB features are extracted.
- Redness index is calculated.
- Paleness index is calculated.
- Texture descriptors are generated.
- Statistical features are generated.
- Feature vector is normalized.
- Feature vector is returned successfully.
- Processing completes within target time.

---

# Testing Checklist

- Test different skin tones.
- Test different lighting conditions.
- Verify RGB extraction.
- Verify HSV conversion.
- Verify LAB conversion.
- Verify GLCM features.
- Verify LBP features.
- Verify normalization.
- Verify feature vector consistency.
- Measure processing time.

---

# Deliverables

- Feature Extraction API
- RGB Feature Extractor
- HSV Feature Extractor
- LAB Feature Extractor
- Redness Index Module
- Paleness Index Module
- Texture Feature Extractor
- Statistical Feature Extractor
- Feature Normalization Module
- FeatureExtractionScreen
- Redux Feature State

---

# Out of Scope

This feature does NOT include

- Machine learning prediction
- Hemoglobin estimation
- Risk classification
- Diet recommendations
- Health history

---

# Future Enhancements

- Deep feature extraction using CNN embeddings.
- Vessel density estimation.
- Color constancy algorithms.
- Adaptive feature selection.
- Feature importance visualization using SHAP.

---

# Next Feature

## Feature 11 - AI Prediction Engine

Implement

- XGBoost model loading
- Model inference
- Risk score calculation
- Confidence score generation
- Low / Moderate / High risk classification
- Explainable AI (SHAP)
- Prediction API
- Model version management