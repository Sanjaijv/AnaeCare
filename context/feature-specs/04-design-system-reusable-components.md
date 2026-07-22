# Feature 04 - Design System & Reusable Components

## Objective

Build a reusable design system for AnaeCare. Every screen in the application should use these components instead of creating UI from scratch.

This feature establishes the application's visual identity and ensures consistency across the entire project.

No business logic or backend integration should be implemented in this phase.

---

# Goals

- Create reusable UI components.
- Define application theme.
- Create typography system.
- Create spacing system.
- Create color palette.
- Create reusable layouts.
- Create reusable form components.
- Create reusable feedback components.

---

# Design Philosophy

AnaeCare is a healthcare application.

The interface should be

- Clean
- Minimal
- Professional
- Accessible
- Easy to understand
- Mobile-first

The UI should reduce user anxiety and guide them through the screening process.

---

# Folder Structure

```
components/

common/

Button/

Card/

Input/

Header/

Loader/

Modal/

Badge/

EmptyState/

ErrorView/

Screen/

Typography/

Avatar/

Divider/

theme/

colors.ts

spacing.ts

typography.ts

theme.ts

constants/

styles.ts
```

---

# Color Palette

## Primary

```
#2563EB
```

Blue

Used for

- Buttons
- Active Icons
- Navigation

---

## Success

```
#10B981
```

Green

Used for

- Low Risk
- Success
- Completed

---

## Warning

```
#F59E0B
```

Orange

Used for

- Moderate Risk
- Alerts

---

## Danger

```
#EF4444
```

Red

Used for

- High Risk
- Errors

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

## Text Primary

```
#111827
```

---

## Text Secondary

```
#6B7280
```

---

## Border

```
#E5E7EB
```

---

# Typography

Use

```
Poppins
```

Fallback

```
System Font
```

---

# Font Sizes

```
Display

32

Heading

28

Title

22

Subtitle

18

Body

16

Caption

14

Small

12
```

---

# Spacing Scale

```
4

8

12

16

20

24

32

40

48
```

Use only these spacing values.

---

# Border Radius

```
Small

8

Medium

12

Large

16

XL

24
```

---

# Shadows

## Card

Light Shadow

---

## Button

Medium Shadow

---

## Modal

Large Shadow

---

# Reusable Components

## Primary Button

Props

```
title

onPress

loading

disabled

icon
```

---

## Secondary Button

Outlined style.

---

## Icon Button

Used throughout the application.

---

## Input Component

Supports

- Label
- Placeholder
- Error
- Secure Text
- Left Icon
- Right Icon

---

## Password Input

Includes

- Show Password
- Hide Password

---

## Card

Reusable card for

- Dashboard
- Prediction
- History
- Diet

---

## Screen Wrapper

Responsibilities

- Safe Area
- Padding
- ScrollView support
- Background color

Every screen must use this wrapper.

---

## Header

Contains

- Title
- Back Button
- Optional Right Action

---

## Loader

Types

- Full Screen
- Inline
- Overlay

---

## Empty State

Example

```
No prediction history available.

Take your first eye scan.
```

---

## Error View

Displays

- Icon
- Title
- Description
- Retry Button

---

## Risk Badge

Three variants

```
Low Risk

Green
```

```
Moderate Risk

Orange
```

```
High Risk

Red
```

---

## Divider

Reusable horizontal separator.

---

## Typography Components

Create reusable components

```
Heading

Title

Subtitle

Body

Caption
```

Never use raw Text styling directly in screens.

---

# Icons

Use

```
@expo/vector-icons
```

Common Icons

- Home
- Camera
- Upload
- User
- History
- Food
- Warning
- Success
- Settings

---

# Layout Rules

Every screen

```
SafeArea

↓

Header

↓

Scrollable Content

↓

Bottom Padding
```

---

# Form Guidelines

- Labels above inputs.
- Consistent spacing.
- Display validation errors below fields.
- Disable submit button while loading.
- Use keyboard-aware layouts.

---

# Accessibility

- Minimum touch target: 48x48.
- High contrast colors.
- Support dynamic text size.
- Screen reader friendly labels.
- Simple language.

---

# Animations

Use only subtle animations.

Recommended

- Fade
- Slide Up
- Button Press
- Loading Spinner

Avoid excessive animations.

---

# Coding Rules

Every reusable component should

- Accept props.
- Be fully typed with TypeScript.
- Avoid hardcoded values.
- Use theme colors.
- Be reusable across the application.

No business logic inside reusable UI components.

---

# Acceptance Criteria

This feature is complete when

- Theme is configured.
- Typography system is implemented.
- Color palette is centralized.
- Spacing system is created.
- All reusable components are implemented.
- Components are documented.
- Placeholder screens use reusable components.
- No duplicate UI code exists.

---

# Testing Checklist

- Buttons render correctly.
- Inputs handle validation states.
- Cards display correctly.
- Headers work on all screens.
- ScreenWrapper applies consistent spacing.
- Theme colors are applied throughout.
- Components are responsive on different screen sizes.

---

# Deliverables

- Complete design system.
- Reusable UI component library.
- Theme configuration.
- Typography system.
- Spacing system.
- Shared layouts.
- Form components.
- Feedback components.

---

# Out of Scope

This feature does NOT include

- Authentication logic
- Camera functionality
- Image upload
- AI prediction
- Backend APIs
- Database integration

---

# Next Feature

## Feature 05 - Home Dashboard

Implement

- Welcome Header
- User Greeting
- Scan Eye Card
- Upload Image Card
- Recent Prediction Card
- Health Tips Section
- Quick Actions
- Bottom Navigation Integration