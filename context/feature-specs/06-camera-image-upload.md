# Feature 06 - Camera & Image Upload

## Objective

Implement the complete image acquisition workflow for AnaeCare. This feature enables users to capture a conjunctiva image using the device camera or upload an existing eye image from the gallery.

This feature focuses only on image acquisition, validation, preview, and temporary storage. AI processing and image quality assessment will be implemented in subsequent phases.

---

# Goals

- Capture eye image using device camera.
- Upload image from gallery.
- Handle camera permissions.
- Handle gallery permissions.
- Preview captured image.
- Allow image retake.
- Compress image before processing.
- Store image temporarily.
- Navigate to Image Quality Assessment.

---

# User Flow

```
Home Dashboard

↓

Scan Eye

↓

Camera Permission

↓

Camera Preview

↓

Capture Image

↓

Image Preview

↓

──────────────────────────

Retake

↓

Camera

──────────────────────────

Continue

↓

Image Quality Assessment
```

---

# Alternative Flow

```
Home Dashboard

↓

Upload Image

↓

Gallery Permission

↓

Select Image

↓

Image Preview

↓

Continue

↓

Image Quality Assessment
```

---

# Functional Requirements

The system shall

- Request camera permission.
- Request gallery permission.
- Open camera.
- Capture image.
- Open gallery.
- Select image.
- Display preview.
- Allow retake.
- Compress large images.
- Store temporary image.
- Navigate to next feature.

---

# Folder Changes

```
screens/

Camera/

CameraScreen.tsx

ImagePreviewScreen.tsx

components/

camera/

CameraPreview.tsx

CaptureButton.tsx

PermissionView.tsx

PreviewToolbar.tsx

ImagePreview.tsx

services/

camera.ts

image.ts

hooks/

useCamera.ts

useImagePicker.ts

utils/

imageUtils.ts

permissions.ts

types/

camera.ts
```

---

# Required Packages

Install

```
expo-camera

expo-image-picker

expo-file-system

expo-image-manipulator
```

---

# Camera Screen

Responsibilities

- Show camera preview.
- Handle permissions.
- Capture photo.
- Toggle flash.
- Switch front/back camera (optional).
- Navigate to preview.

---

# Gallery Upload

Responsibilities

- Open gallery.
- Select image.
- Validate image.
- Navigate to preview.

---

# Image Preview Screen

Display

- Captured Image
- Retake Button
- Continue Button

No AI processing occurs here.

---

# Camera Permissions

If granted

↓

Open camera

If denied

↓

Display permission screen

↓

Allow retry

Example

```
Camera permission is required to capture eye images.
```

---

# Gallery Permissions

If denied

Display

```
Gallery permission is required to upload eye images.
```

---

# Image Validation

Accept

- JPG
- JPEG
- PNG

Reject

- GIF
- WEBP
- PDF
- Other formats

---

# File Size

Maximum

```
10 MB
```

If exceeded

```
Image is too large.

Please select another image.
```

---

# Image Resolution

Minimum

```
720 x 720
```

Recommended

```
1080 x 1080
```

---

# Image Compression

Compress before storing.

Target

```
80–90% quality
```

Maintain original aspect ratio.

---

# Temporary Storage

Store

```
Image URI

Width

Height

File Size

Timestamp
```

Do not upload to backend in this phase.

---

# Services

## camera.ts

Responsibilities

- Capture image
- Request permissions

---

## image.ts

Responsibilities

- Pick image
- Compress image
- Validate image

---

# Hooks

## useCamera

Handles

- Camera permission
- Capture
- Flash

---

## useImagePicker

Handles

- Gallery selection
- Validation

---

# UI Components

## CameraPreview

Displays

Live camera feed.

---

## CaptureButton

Large circular capture button.

---

## PermissionView

Displayed when permission is denied.

Contains

- Icon
- Description
- Retry Button

---

## PreviewToolbar

Buttons

- Retake
- Continue

---

## ImagePreview

Displays captured image.

---

# State Management

Store temporarily

```
Image URI

Image Width

Image Height

File Size
```

No Redux persistence.

---

# Error Handling

Handle

- Camera unavailable
- Permission denied
- Gallery unavailable
- Capture failure
- Invalid image
- Large image
- Corrupted image

Display user-friendly messages.

---

# Accessibility

- Large capture button.
- Clear permission messages.
- Screen reader labels.
- High contrast controls.

---

# Performance

- Compress images before processing.
- Avoid loading full-resolution images unnecessarily.
- Release camera resources when leaving screen.

---

# Acceptance Criteria

The feature is complete when

- Camera opens successfully.
- Gallery opens successfully.
- Permissions work correctly.
- User can capture an image.
- User can upload an image.
- Preview screen displays correctly.
- Retake works.
- Continue button navigates to Image Quality Assessment.
- Invalid images are rejected.
- Large images are compressed.
- No crashes occur.

---

# Testing Checklist

- Grant camera permission.
- Deny camera permission.
- Grant gallery permission.
- Deny gallery permission.
- Capture image.
- Upload image.
- Retake image.
- Continue to next screen.
- Test invalid file.
- Test oversized image.
- Test low-resolution image.

---

# Deliverables

- CameraScreen
- ImagePreviewScreen
- CameraPreview Component
- CaptureButton
- PermissionView
- PreviewToolbar
- Image Services
- Camera Hooks
- Gallery Hooks

---

# Out of Scope

This feature does NOT include

- Image quality assessment
- Conjunctiva detection
- AI prediction
- Backend upload
- Database storage
- Recommendation generation

---

# Next Feature

## Feature 07 - Image Quality Assessment

Implement

- Blur Detection
- Brightness Analysis
- Contrast Analysis
- Resolution Validation
- Eye Visibility Detection
- Quality Score Generation
- Image Acceptance/Rejection