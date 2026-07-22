# AnaeCare - UI Context

# Design Philosophy

AnaeCare is a healthcare application focused on simplicity, accessibility, and trust. The interface should be clean, minimal, and easy to use for users of all age groups, especially those in rural and remote areas.

The design should reduce cognitive load by presenting only the necessary information at each step.

---

# Design Principles

- Simple and intuitive navigation.
- Minimal user interaction for completing a prediction.
- Clear visual hierarchy.
- Accessible color palette.
- Responsive layouts.
- Consistent spacing and typography.
- Large touch targets.
- Clear feedback for every user action.
- Medical information should be easy to understand.

---

# Theme

Light Theme (Primary)

Dark Theme (Future Enhancement)

---

# Color Palette

## Primary

```
#2563EB
```

Used for

- Primary buttons
- Navigation
- Active elements

---

## Secondary

```
#10B981
```

Used for

- Success states
- Healthy status
- Recommendations

---

## Warning

```
#F59E0B
```

Used for

- Moderate Risk
- Notifications
- Warnings

---

## Danger

```
#EF4444
```

Used for

- High Risk
- Error Messages
- Critical Alerts

---

## Background

```
#F8FAFC
```

---

## Surface

```
#FFFFFF
```

---

## Border

```
#E5E7EB
```

---

## Text

Primary

```
#111827
```

Secondary

```
#6B7280
```

Disabled

```
#9CA3AF
```

---

# Typography

## Font

Primary

```
Poppins
```

Fallback

```
System Font
```

---

## Font Sizes

| Element | Size |
|----------|------|
| App Title | 28 |
| Screen Title | 24 |
| Section Title | 20 |
| Card Title | 18 |
| Body Text | 16 |
| Caption | 14 |
| Small Text | 12 |

---

# Border Radius

| Component | Radius |
|-----------|--------|
| Button | 12 |
| Card | 16 |
| Modal | 20 |
| Input | 12 |
| Image | 16 |

---

# Elevation

Cards

```
Soft Shadow
```

Buttons

```
Medium Shadow
```

Dialogs

```
High Shadow
```

---

# Navigation Structure

```
Splash

↓

Authentication

├── Login

└── Register

↓

Home

├── Capture Eye

├── Upload Image

├── History

├── Diet

└── Profile

↓

Prediction Result

↓

Doctor Alert
```

---

# Bottom Navigation

Tabs

```
Home

History

Diet

Profile
```

---

# Screen Specifications

## Splash Screen

Components

- Logo
- App Name
- Loading Indicator

Purpose

Initialize application.

---

## Login Screen

Components

- Email
- Password
- Login Button
- Register Link

---

## Register Screen

Components

- Name
- Email
- Password
- Confirm Password
- Age
- Gender
- Register Button

---

## Home Screen

Components

- Welcome Card
- Scan Eye Button
- Upload Image Button
- Recent Prediction
- Health Tips
- Quick Actions

---

## Camera Screen

Components

- Camera Preview
- Capture Button
- Flash Toggle
- Gallery Button

---

## Image Preview Screen

Components

- Captured Image
- Retake Button
- Continue Button

---

## Loading Screen

Components

- Loading Animation
- Progress Indicator
- Status Message

Example

```
Analyzing Image...

Please wait...
```

---

## Prediction Screen

Components

- Risk Level
- Confidence Score
- Explanation
- Recommendation Button
- Save Result

---

## History Screen

Components

- Prediction Cards
- Search
- Filter
- Timeline

---

## Diet Screen

Components

- Iron-rich Foods
- Vitamin C Foods
- Foods to Avoid
- Daily Tips

---

## Profile Screen

Components

- User Information
- Edit Profile
- Logout

---

## Doctor Alert Screen

Components

- Risk Warning
- Recommendation
- Emergency Guidance
- Call Doctor Button (Future)

---

# Common Components

## Buttons

Primary Button

Secondary Button

Outlined Button

Text Button

Icon Button

Loading Button

---

## Cards

Prediction Card

History Card

Diet Card

Health Tip Card

Risk Card

---

## Inputs

Text Input

Password Input

Email Input

Search Input

Dropdown

Radio Button

Checkbox

---

## Dialogs

Confirmation Dialog

Error Dialog

Success Dialog

Permission Dialog

---

## Indicators

Loading Spinner

Progress Bar

Risk Badge

Success Badge

Warning Badge

Error Badge

---

# Risk Colors

Low Risk

```
Green
```

Moderate Risk

```
Orange
```

High Risk

```
Red
```

---

# Icons

Recommended Library

```
Expo Vector Icons
```

Icons

- Home
- Camera
- Upload
- History
- User
- Food
- Warning
- Check
- Close
- Settings
- Logout

---

# Animations

Use subtle animations only.

Recommended

- Fade In
- Slide Up
- Button Press
- Loading Spinner
- Progress Animation

Avoid excessive animations.

---

# Empty States

History

```
No predictions yet.

Take your first scan.
```

---

Diet

```
Recommendations will appear after your first prediction.
```

---

# Error States

Camera Permission Denied

```
Camera permission is required to capture eye images.
```

---

Invalid Image

```
The uploaded image is unclear.

Please upload another image.
```

---

Server Error

```
Unable to process your request.

Please try again.
```

---

# Accessibility

- Support dynamic font scaling.
- Maintain sufficient color contrast.
- Large touch targets (minimum 48x48).
- Screen reader compatibility.
- Simple language for health information.
- Avoid medical jargon where possible.

---

# UI Guidelines

Always

- Keep screens uncluttered.
- Use consistent spacing.
- Display loading indicators during API calls.
- Show meaningful feedback for every action.
- Use cards to organize content.
- Keep forms short and simple.
- Use icons with labels.

Never

- Overload users with information.
- Use more than one primary action per screen.
- Hide important health information.
- Display technical AI terms directly to users.
- Use flashing or distracting animations.

---

# Future UI Enhancements

- Dark Mode
- Multi-language Support
- Voice Assistance
- Larger Accessibility Mode
- Tablet Layout
- Doctor Dashboard
- Family Member Profiles
- Wearable Device Integration