# Feature 07 - Image Quality Assessment

## Objective

Implement an automated Image Quality Assessment (IQA) module that validates whether a captured or uploaded eye image is suitable for anemia prediction.

The objective is to prevent poor-quality images from entering the AI pipeline, thereby improving prediction accuracy and reducing false classifications.

Only images that pass every validation rule should proceed to the preprocessing stage.

---

# Goals

- Validate image quality.
- Detect blurry images.
- Detect poor lighting.
- Validate image resolution.
- Verify eye visibility.
- Ensure conjunctiva is clearly visible.
- Generate an overall quality score.
- Reject poor-quality images with actionable feedback.

---

# User Flow

```
Camera / Gallery

↓

Image Preview

↓

Image Quality Assessment

↓

───────────────────────────

Pass

↓

Image Preprocessing

───────────────────────────

Fail

↓

Show Quality Issues

↓

Retake Image
```

---

# Functional Requirements

The system shall

- Analyze every captured image.
- Generate an image quality score.
- Detect blur.
- Detect brightness problems.
- Detect contrast issues.
- Detect eye visibility.
- Validate image resolution.
- Display quality feedback.
- Allow the user to retake the image.

---

# Folder Structure

```
backend/

app/

services/

quality/

imageQualityService.py

validators/

blur.py

brightness.py

contrast.py

resolution.py

eyeVisibility.py

routers/

quality.py

schemas/

quality.py

mobile/

screens/

ImageQuality/

ImageQualityScreen.tsx

components/

quality/

QualityCard.tsx

QualityIndicator.tsx

QualityIssueCard.tsx

LoadingAnalysis.tsx

store/

qualitySlice.ts
```

---

# Quality Assessment Pipeline

```
Input Image

↓

Resolution Validation

↓

Blur Detection

↓

Brightness Analysis

↓

Contrast Analysis

↓

Eye Detection

↓

Conjunctiva Visibility

↓

Quality Score

↓

Decision
```

---

# Validation Rules

## Resolution

Minimum

```
720 × 720
```

Recommended

```
1080 × 1080
```

Failure

```
Image resolution is too low.
```

---

## Blur Detection

Method

```
Variance of Laplacian
```

Threshold

Defined experimentally.

Failure

```
The image appears blurry.

Please hold the camera steady.
```

---

## Brightness

Measure

Average pixel intensity.

Acceptable Range

```
40%

↓

85%
```

Failure

```
Lighting is too dark.

Move to a brighter location.
```

or

```
Lighting is too bright.

Reduce glare.
```

---

## Contrast

Ensure sufficient contrast for conjunctiva analysis.

Failure

```
Image contrast is too low.
```

---

## Eye Visibility

Detect

- Eye present
- Eye fully open
- Lower eyelid visible

Failure

```
Please keep your eye fully visible.
```

---

## Conjunctiva Visibility

Verify

- Lower eyelid exposed
- Conjunctiva region visible
- No major occlusion

Failure

```
Pull down your lower eyelid slightly and retake the image.
```

---

# Quality Score

Each validation contributes to an overall score.

| Check | Weight |
|--------|--------|
| Resolution | 15% |
| Blur | 25% |
| Brightness | 20% |
| Contrast | 15% |
| Eye Visibility | 15% |
| Conjunctiva Visibility | 10% |

---

# Decision Rules

```
Score ≥ 85

↓

Excellent

↓

Continue
```

---

```
Score 70–84

↓

Acceptable

↓

Continue with Warning
```

---

```
Score < 70

↓

Reject

↓

Retake Image
```

---

# Backend API

## POST

```
/quality/check
```

Input

```
Image File
```

Output

```json
{
  "success": true,
  "qualityScore": 91,
  "status": "Excellent",
  "checks": {
    "blur": true,
    "brightness": true,
    "contrast": true,
    "resolution": true,
    "eyeVisible": true,
    "conjunctivaVisible": true
  },
  "recommendation": "Image quality is sufficient for analysis."
}
```

---

# Mobile Screen

## ImageQualityScreen

Displays

- Image Preview
- Circular Quality Score
- Individual Validation Results
- Continue Button
- Retake Button

---

# Components

## QualityCard

Displays

Overall quality score.

---

## QualityIndicator

Displays

Pass / Fail icon.

---

## QualityIssueCard

Displays

Problem description.

Example

```
Lighting is too dark.
```

---

## LoadingAnalysis

Shows

```
Analyzing image quality...
```

while backend processing is running.

---

# State Management

Store

```
Image URI

Quality Score

Validation Results

Recommendation
```

Use Redux Toolkit.

---

# Error Handling

Handle

- Invalid image
- Processing failure
- No eye detected
- No conjunctiva detected
- Server unavailable
- Timeout

Display user-friendly messages.

---

# Accessibility

- Large readable score.
- Color + icon indicators (do not rely on color alone).
- Screen reader support.
- High contrast UI.

---

# Performance

Target processing time

```
< 2 seconds
```

Quality assessment should complete before preprocessing begins.

---

# Acceptance Criteria

The feature is complete when

- Every uploaded image is evaluated.
- Blur detection works.
- Brightness validation works.
- Resolution validation works.
- Eye visibility detection works.
- Quality score is generated.
- Failed images are rejected.
- Users receive clear guidance for improving image quality.
- Accepted images proceed to preprocessing.

---

# Testing Checklist

- Test blurry images.
- Test dark images.
- Test overexposed images.
- Test low-resolution images.
- Test images without an eye.
- Test partially visible conjunctiva.
- Verify quality score calculation.
- Verify Continue and Retake flows.
- Measure processing time.

---

# Deliverables

- ImageQualityScreen
- Quality Assessment API
- Blur Detection Module
- Brightness Validator
- Contrast Validator
- Resolution Validator
- Eye Visibility Validator
- Quality Score Engine
- Redux Quality State

---

# Out of Scope

This feature does NOT include

- Image preprocessing
- Conjunctiva segmentation
- Feature extraction
- AI prediction
- Recommendation generation

---

# Next Feature

## Feature 08 - Image Preprocessing

Implement

- Image normalization
- Noise reduction
- Histogram equalization
- Color correction
- Image resizing
- Preparation for conjunctiva detection