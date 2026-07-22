# Feature 08 - Image Preprocessing

## Objective

Implement the Image Preprocessing module to prepare validated eye images for conjunctiva detection and AI analysis. The preprocessing pipeline should normalize images, reduce noise, improve contrast, and standardize image dimensions while preserving clinically relevant visual information.

This module acts as the bridge between Image Quality Assessment and Conjunctiva Detection.

---

# Goals

- Normalize all images.
- Resize images to a standard resolution.
- Reduce image noise.
- Improve contrast.
- Normalize color distribution.
- Enhance conjunctiva visibility.
- Produce a clean image for downstream AI processing.

---

# Pipeline Position

```
Camera / Gallery

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

The preprocessing pipeline shall

- Accept only images that passed Image Quality Assessment.
- Resize images to a fixed resolution.
- Preserve aspect ratio where possible.
- Remove image noise.
- Normalize brightness.
- Improve contrast.
- Perform histogram equalization.
- Normalize color channels.
- Return the processed image.

---

# Folder Structure

```
backend/

app/

services/

preprocessing/

preprocessing_service.py

operations/

resize.py

noise_reduction.py

histogram_equalization.py

color_normalization.py

brightness_normalization.py

pipeline.py

routers/

preprocessing.py

schemas/

preprocessing.py

mobile/

screens/

Preprocessing/

PreprocessingScreen.tsx

components/

preprocessing/

ProcessingAnimation.tsx

ProcessingStatus.tsx
```

---

# Processing Pipeline

```
Input Image

↓

Resize

↓

Noise Reduction

↓

Brightness Normalization

↓

Histogram Equalization

↓

Color Normalization

↓

Output Image
```

---

# Step 1 - Resize

Purpose

Convert all images to a common size.

Target Resolution

```
512 × 512
```

Maintain aspect ratio when possible.

Padding should be used instead of stretching.

---

# Step 2 - Noise Reduction

Purpose

Remove sensor noise while preserving image details.

Technique

```
Gaussian Blur

or

Median Filter
```

Output

Cleaner image.

---

# Step 3 - Brightness Normalization

Purpose

Reduce lighting differences between images.

Technique

Adaptive normalization.

Output

Consistent illumination.

---

# Step 4 - Histogram Equalization

Purpose

Improve contrast.

Technique

CLAHE

(Contrast Limited Adaptive Histogram Equalization)

Reason

CLAHE preserves local details better than global histogram equalization.

---

# Step 5 - Color Normalization

Purpose

Normalize RGB channels.

Possible Techniques

- White Balance
- Gray World Assumption
- Color Constancy

Output

Consistent color representation.

---

# Backend API

## POST

```
/api/v1/preprocessing/process
```

Input

Image file.

Output

```json
{
    "success": true,
    "status": "completed",
    "processedImage": "processed_image.png",
    "resolution": "512x512",
    "processingTime": 1.4
}
```

---

# Frontend Screen

## PreprocessingScreen

Purpose

Display processing progress.

Components

- Processing Animation
- Current Step
- Progress Bar
- Cancel Button (Future)

---

# UI Flow

```
Preparing Image...

↓

Removing Noise...

↓

Enhancing Contrast...

↓

Normalizing Colors...

↓

Completed
```

---

# Components

## ProcessingAnimation

Displays

Animated illustration while processing.

---

## ProcessingStatus

Displays

Current preprocessing step.

---

# Processing Metadata

Store

```
Original Resolution

Processed Resolution

Processing Time

Operations Applied
```

This metadata will be useful for debugging.

---

# State Management

Redux Slice

```
preprocessing

↓

loading

status

processedImage

processingTime

operations
```

---

# Error Handling

Handle

- Corrupted image.
- Unsupported format.
- Processing timeout.
- Memory allocation failure.
- Invalid image.

Display meaningful error messages.

---

# Performance

Target processing time

```
< 2 seconds
```

Memory usage should remain low.

Avoid creating multiple copies of large images.

---

# Acceptance Criteria

The feature is complete when

- Images are resized correctly.
- Noise reduction is applied.
- Brightness normalization works.
- CLAHE is applied successfully.
- Color normalization is performed.
- Processed image is returned.
- Processing metadata is generated.
- Frontend displays processing progress.
- No image corruption occurs.

---

# Testing Checklist

- Test with dark images.
- Test with bright images.
- Test noisy images.
- Test high-resolution images.
- Test low-resolution images.
- Measure processing time.
- Verify processed image quality.
- Verify metadata generation.

---

# Deliverables

- Preprocessing API
- Preprocessing Service
- Resize Module
- Noise Reduction Module
- Brightness Normalization Module
- Histogram Equalization Module
- Color Normalization Module
- PreprocessingScreen
- Processing Components
- Redux Preprocessing State

---

# Out of Scope

This feature does NOT include

- Conjunctiva detection.
- Feature extraction.
- AI prediction.
- Recommendation generation.

---

# Next Feature

## Feature 09 - Conjunctiva Detection

Implement

- Eye detection
- Lower eyelid detection
- Conjunctiva localization
- Region of Interest (ROI) extraction
- ROI validation
- ROI visualization
- API integration for conjunctiva segmentation