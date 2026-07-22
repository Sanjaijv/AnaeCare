# Feature 09 - Conjunctiva Detection

## Objective

Implement the Conjunctiva Detection module to accurately locate, segment, and extract the palpebral conjunctiva region from a preprocessed eye image.

The extracted Region of Interest (ROI) will be used by the Feature Extraction and AI Prediction modules.

This phase is responsible only for locating the conjunctiva and validating the extracted region. No anemia prediction is performed.

---

# Goals

- Detect the eye.
- Detect facial landmarks.
- Detect the lower eyelid.
- Locate the palpebral conjunctiva.
- Extract the Region of Interest (ROI).
- Validate ROI quality.
- Return cropped conjunctiva image.

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

- Detect one eye.
- Detect facial landmarks.
- Identify the lower eyelid.
- Identify the conjunctiva region.
- Crop the conjunctiva.
- Validate ROI dimensions.
- Reject invalid ROI.
- Return ROI for feature extraction.

---

# Folder Structure

```
backend/

app/

services/

conjunctiva/

conjunctiva_service.py

detectors/

eye_detector.py

face_landmarks.py

lower_eyelid.py

roi_extractor.py

roi_validator.py

pipeline.py

routers/

conjunctiva.py

schemas/

conjunctiva.py

mobile/

screens/

ConjunctivaDetection/

ConjunctivaDetectionScreen.tsx

components/

conjunctiva/

DetectionAnimation.tsx

ROIViewer.tsx

DetectionStatus.tsx
```

---

# Detection Pipeline

```
Input Image

↓

Face Detection

↓

Eye Detection

↓

Facial Landmark Detection

↓

Lower Eyelid Detection

↓

Conjunctiva Localization

↓

ROI Extraction

↓

ROI Validation

↓

Return ROI
```

---

# Face Detection

Purpose

Locate the user's face.

Recommended Libraries

- MediaPipe Face Mesh
- OpenCV Haar Cascade
- Dlib

Preferred

```
MediaPipe Face Mesh
```

Reason

High accuracy and real-time performance.

---

# Eye Detection

Purpose

Locate the eye region.

Output

Bounding Box

```
x

y

width

height
```

---

# Facial Landmark Detection

Detect facial landmarks around the eye.

Recommended

```
MediaPipe Face Mesh

468 landmarks
```

Important landmarks

- Upper eyelid
- Lower eyelid
- Eye corners

---

# Lower Eyelid Detection

Purpose

Locate the lower eyelid boundary.

Output

Polyline

Used to identify the conjunctiva.

---

# Conjunctiva Localization

Locate

```
Palpebral Conjunctiva
```

Requirements

- Visible
- Not occluded
- Properly illuminated

Output

Polygon

---

# ROI Extraction

Crop

Only the conjunctiva.

Do not include

- Eyelashes
- Iris
- Skin
- Background

Output

```
ROI Image
```

---

# ROI Validation

Validate

Resolution

Minimum

```
128 × 128
```

Visibility

```
80%
```

Blur

Must pass.

Occlusion

Less than

```
20%
```

---

# Backend API

POST

```
/api/v1/conjunctiva/detect
```

Input

Image

Output

```json
{
    "success": true,
    "roiDetected": true,
    "roiImage": "roi.png",
    "boundingBox": {
        "x": 120,
        "y": 80,
        "width": 180,
        "height": 95
    },
    "processingTime": 0.82
}
```

---

# Frontend Screen

## ConjunctivaDetectionScreen

Purpose

Visualize detection progress.

Components

- Detection Animation
- ROI Preview
- Detection Status
- Continue Button

---

# Components

## DetectionAnimation

Shows

```
Locating Eye...
```

↓

```
Finding Landmarks...
```

↓

```
Extracting Conjunctiva...
```

---

## ROIViewer

Display

Original Image

↓

Extracted ROI

---

## DetectionStatus

Display

- Face Detected
- Eye Detected
- ROI Valid
- Ready

---

# State Management

Redux Slice

```
conjunctiva

↓

loading

status

roiImage

boundingBox

processingTime

validation
```

---

# Error Handling

Handle

- Face not detected.
- Multiple faces detected.
- Eye not detected.
- ROI too small.
- Conjunctiva not visible.
- Landmark detection failure.
- Processing timeout.

Return meaningful guidance.

Example

```
Unable to locate the conjunctiva.

Please pull down your lower eyelid slightly and try again.
```

---

# Performance

Target

```
< 2 seconds
```

Detection should work efficiently on standard mobile-captured images.

---

# Acceptance Criteria

The feature is complete when

- Face is detected.
- Eye is detected.
- Facial landmarks are detected.
- Lower eyelid is identified.
- Conjunctiva ROI is extracted.
- ROI validation passes.
- Cropped ROI is returned.
- ROI is displayed on the frontend.
- Processing completes within target time.

---

# Testing Checklist

- Test frontal eye images.
- Test images with glasses.
- Test partially closed eyes.
- Test different lighting conditions.
- Test different skin tones.
- Test low-resolution images.
- Verify ROI accuracy.
- Verify API response.
- Measure processing time.

---

# Deliverables

- Conjunctiva Detection API
- Face Detection Module
- Eye Detection Module
- Facial Landmark Detector
- Lower Eyelid Detector
- ROI Extraction Module
- ROI Validation Module
- ConjunctivaDetectionScreen
- ROI Viewer
- Redux Conjunctiva State

---

# Out of Scope

This feature does NOT include

- Feature extraction
- Hemoglobin estimation
- Anemia prediction
- Recommendation generation

---

# Future Improvements

- Deep learning–based conjunctiva segmentation (e.g., U-Net).
- Multi-eye detection with automatic eye selection.
- Occlusion-aware ROI extraction.
- On-device inference using TensorFlow Lite.
- Automatic quality refinement before feature extraction.

---

# Next Feature

## Feature 10 - Feature Extraction

Implement

- RGB feature extraction
- HSV feature extraction
- LAB color space extraction
- Redness index calculation
- Paleness index calculation
- Brightness analysis
- Texture feature extraction (GLCM, LBP)
- Feature vector generation
- Feature normalization
- API integration with the AI Prediction Engine