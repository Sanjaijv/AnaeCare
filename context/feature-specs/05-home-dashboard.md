# Feature 05 - Home Dashboard

## Objective

Develop the Home Dashboard, which serves as the primary landing page after a successful login. The dashboard should provide users with quick access to the application's core features, display health-related information, and guide them toward the anemia screening workflow.

This feature focuses only on the user interface and navigation. AI prediction, backend integration, and dynamic data will be implemented in later phases.

---

# Goals

- Create an intuitive dashboard.
- Provide quick access to eye scanning.
- Display recent prediction summary.
- Display health tips.
- Provide navigation to all major modules.
- Build reusable dashboard cards.

---

# User Flow

```
Login

↓

Home Dashboard

↓

────────────────────────────────────

Scan Eye

↓

Camera

────────────────────────────────────

Upload Image

↓

Gallery

────────────────────────────────────

History

↓

Prediction History

────────────────────────────────────

Diet

↓

Recommendations

────────────────────────────────────

Profile

↓

User Information
```

---

# Functional Requirements

The dashboard shall

- Welcome the user.
- Display the user's name.
- Display today's date.
- Provide quick action cards.
- Display a health tip.
- Display recent prediction summary.
- Support pull-to-refresh.
- Navigate to all major modules.

---

# Screen Layout

```
Safe Area

↓

App Header

↓

Welcome Section

↓

Quick Action Cards

↓

Recent Prediction

↓

Health Tip

↓

Bottom Navigation
```

---

# Sections

## 1. App Header

Components

- App Logo
- App Name
- Notification Icon (Future)
- Profile Avatar

---

## 2. Welcome Card

Display

```
Good Morning,

John Doe
```

Also display

```
Stay healthy.

Early detection saves lives.
```

---

## 3. Quick Actions

Create four large action cards.

### Scan Eye

Icon

Camera

Action

Navigate to Camera Screen

---

### Upload Image

Icon

Gallery

Action

Navigate to Upload Screen

---

### Prediction History

Icon

History

Action

Navigate to History Screen

---

### Diet Recommendations

Icon

Restaurant

Action

Navigate to Diet Screen

---

# Card Design

Each card contains

- Icon
- Title
- Subtitle
- Arrow Icon

Example

```
📷

Scan Eye

Capture a conjunctiva image
```

---

# Recent Prediction

Initially

```
No predictions yet.

Take your first scan.
```

Later

Display

- Risk Level
- Date
- Confidence
- View Details Button

---

# Health Tip Card

Random tip

Examples

```
Include iron-rich foods like spinach and beans in your daily diet.
```

```
Vitamin C improves iron absorption.
```

```
Drink sufficient water every day.
```

```
Regular health checkups help detect anemia early.
```

One random tip per application launch.

---

# Floating Action Button

Bottom-right

Camera icon

Action

Open Camera Screen

---

# Navigation

Buttons

```
Scan Eye

↓

Camera
```

```
Upload Image

↓

Upload Screen
```

```
History

↓

History Screen
```

```
Diet

↓

Diet Screen
```

```
Profile Avatar

↓

Profile Screen
```

---

# Placeholder Data

Until backend integration

User

```
John Doe
```

Risk

```
No Prediction
```

Health Tip

Random local list.

---

# Folder Changes

```
screens/

Home/

HomeScreen.tsx

components/

dashboard/

WelcomeCard.tsx

QuickActionCard.tsx

PredictionCard.tsx

HealthTipCard.tsx

FloatingScanButton.tsx
```

---

# Reusable Components

## WelcomeCard

Props

```
name

greeting
```

---

## QuickActionCard

Props

```
title

subtitle

icon

onPress
```

---

## PredictionCard

Props

```
risk

date

confidence
```

---

## HealthTipCard

Props

```
tip
```

---

## FloatingScanButton

Props

```
onPress
```

---

# Styling Guidelines

Cards

- Rounded corners
- Soft shadow
- Consistent spacing

Buttons

- Large touch area
- Rounded edges

Icons

- Blue accent
- Uniform size

Spacing

Follow the spacing system defined in Feature 04.

---

# Animations

Use subtle animations.

- Fade-in dashboard.
- Scale effect on cards.
- Ripple effect on buttons.

Avoid excessive motion.

---

# Accessibility

- Screen reader labels.
- Minimum touch size of 48x48.
- High contrast colors.
- Readable typography.

---

# Acceptance Criteria

The feature is complete when

- Dashboard loads after login.
- Welcome card displays.
- Quick action cards are visible.
- Health tip card is displayed.
- Recent prediction placeholder appears.
- Floating scan button works.
- Navigation to placeholder screens functions correctly.
- Layout is responsive on different screen sizes.

---

# Testing Checklist

- Verify dashboard loads successfully.
- Verify all cards render correctly.
- Verify button navigation.
- Verify health tip changes on app restart.
- Verify responsive layout.
- Verify no layout overflow.
- Verify animations are smooth.
- Verify accessibility labels.

---

# Deliverables

- HomeScreen
- WelcomeCard
- QuickActionCard
- PredictionCard
- HealthTipCard
- FloatingScanButton
- Dashboard Navigation

---

# Out of Scope

This feature does NOT include

- Camera functionality
- Image upload
- AI prediction
- Backend APIs
- Database
- Dynamic prediction history
- Diet recommendation engine

---

# Next Feature

## Feature 06 - Camera & Image Upload

Implement

- Camera integration using Expo Camera
- Gallery image selection
- Camera permissions
- Image preview
- Retake functionality
- Image compression
- Temporary local image storage
- Navigation to Image Quality Assessment