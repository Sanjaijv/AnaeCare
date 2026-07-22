# AnaeCare - AI Workflow Rules

# Overview

AnaeCare follows a structured, modular, and verifiable AI pipeline for early anemia risk screening using conjunctiva image analysis.

Every stage of the workflow has a single responsibility and must be completed before proceeding to the next stage. This ensures reliable predictions, maintainable code, and a scalable architecture.

---

# AI Development Principles

- Build the AI pipeline incrementally.
- Each module must have a single responsibility.
- Validate every input before processing.
- Keep preprocessing independent from model inference.
- Separate training and inference code.
- Never skip image quality validation.
- Every prediction must be explainable.
- Every prediction should be stored in the database.

---

# AI Workflow Pipeline

```
User

↓

Capture / Upload Eye Image

↓

Image Validation

↓

Image Quality Assessment

↓

Image Preprocessing

↓

Conjunctiva Detection

↓

Feature Extraction

↓

Machine Learning Model

↓

Risk Classification

↓

Confidence Score

↓

Prediction Explanation

↓

Diet Recommendation

↓

Save Prediction

↓

Display Result
```

---

# Phase 1 - Image Acquisition

Purpose

Collect a conjunctiva image from the user.

Input

- Camera Capture
- Gallery Upload

Validation

- Supported image format
- Maximum image size
- Eye visibility

Output

Original eye image

---

# Phase 2 - Image Quality Assessment

Purpose

Determine whether the uploaded image is suitable for AI analysis.

Checks

- Blur detection
- Brightness
- Contrast
- Resolution
- Eye visibility
- Image orientation
- Noise level

Decision

Pass

↓

Continue

Fail

↓

Reject image

↓

Ask user to upload another image

Rule

No prediction should occur if image quality validation fails.

---

# Phase 3 - Image Preprocessing

Purpose

Prepare the image for AI analysis.

Operations

- Resize
- Denoise
- Normalize
- Histogram Equalization
- Color Correction
- Brightness Adjustment

Output

Clean image

---

# Phase 4 - Conjunctiva Detection

Purpose

Locate the conjunctiva region accurately.

Possible Methods

- OpenCV
- MediaPipe
- YOLO
- CNN Segmentation

Output

Region of Interest (ROI)

Only the conjunctiva region should be passed to the AI model.

---

# Phase 5 - Feature Extraction

Purpose

Extract useful features from the conjunctiva.

Color Features

- RGB
- HSV
- LAB

Clinical Features

- Paleness
- Redness
- Brightness

Texture Features

- GLCM
- LBP

Output

Feature Vector

---

# Phase 6 - AI Prediction

Purpose

Predict anemia risk.

Possible Models

- Random Forest
- XGBoost
- LightGBM
- MobileNet
- EfficientNet
- CNN

Output

- Low Risk
- Moderate Risk
- High Risk

Also generate

- Confidence Score

---

# Phase 7 - Explainable AI

Purpose

Help users understand the prediction.

Every prediction should include

- Risk Level
- Confidence Score
- Explanation

Example

```
High Risk

Confidence

94%

Reason

The conjunctiva appears pale with reduced redness, which may indicate lower hemoglobin levels.
```

Never return only a prediction label.

---

# Phase 8 - Recommendation Engine

Purpose

Generate personalized recommendations.

Recommendations

- Iron-rich foods
- Vitamin C foods
- Hydration
- Lifestyle tips
- Medical consultation advice

Recommendations should depend on

- Risk level
- Age
- Gender
- User symptoms

---

# Phase 9 - Save Prediction

Store

- User ID
- Prediction
- Confidence
- Explanation
- Timestamp
- Recommendations
- Image Path

Never store raw temporary images unless required.

---

# Phase 10 - Display Results

Show

- Risk Level
- Confidence
- Explanation
- Recommendation
- Next Steps

The result screen should be easy for non-technical users to understand.

---

# Model Training Workflow

```
Dataset

↓

Cleaning

↓

Label Verification

↓

Train/Test Split

↓

Image Preprocessing

↓

Feature Extraction

↓

Model Training

↓

Evaluation

↓

Model Selection

↓

Model Export

↓

Backend Deployment
```

Training code must never be used in production inference.

---

# Inference Workflow

```
Input Image

↓

Quality Assessment

↓

Preprocessing

↓

Conjunctiva Detection

↓

Feature Extraction

↓

Model Prediction

↓

Explanation

↓

Recommendation

↓

Database Storage

↓

Return Response
```

---

# Folder Structure

```
backend/

ml/

preprocessing/

quality/

conjunctiva/

features/

models/

training/

inference/

evaluation/

explainability/
```

Each folder should contain only its related logic.

---

# Development Rules

Always

- Validate image quality before prediction.
- Keep preprocessing deterministic.
- Store prediction history.
- Handle AI failures gracefully.
- Return consistent API responses.
- Log prediction events for debugging.

Never

- Skip preprocessing.
- Mix UI logic with AI logic.
- Hardcode model paths.
- Train models inside API requests.
- Expose internal model details to users.
- Return predictions without confidence scores.

---

# Error Handling

Handle the following cases gracefully

- No face detected
- No eye detected
- Blurry image
- Low lighting
- Invalid file format
- Corrupted image
- Model loading failure
- Prediction timeout
- Backend connection failure

Return user-friendly error messages instead of technical errors.

---

# Performance Guidelines

- Optimize uploaded images before processing.
- Load the AI model once during backend startup.
- Avoid repeated preprocessing steps.
- Cache reusable resources when possible.
- Keep API response time as low as possible.

Target Response Time

- Image validation: < 1 second
- Image preprocessing: < 2 seconds
- AI prediction: < 3 seconds
- Total response: < 5 seconds

---

# Security Guidelines

- Validate all uploaded files.
- Accept only supported image formats.
- Limit maximum upload size.
- Authenticate all prediction requests.
- Protect user health data.
- Do not expose model files publicly.

---

# Future Enhancements

- Hemoglobin value estimation.
- TensorFlow Lite for on-device inference.
- Grad-CAM visualization.
- Offline prediction support.
- Continuous model improvement with larger datasets.
- Multi-model ensemble prediction.
- Telemedicine integration.

---

# AI Workflow Philosophy

AnaeCare is designed as a **first-level screening tool**, not a replacement for laboratory blood tests. The AI system should prioritize **accuracy, reliability, transparency, and user safety**. Every prediction must be validated, explainable, and accompanied by actionable health guidance, ensuring users receive meaningful support while encouraging medical consultation when necessary.