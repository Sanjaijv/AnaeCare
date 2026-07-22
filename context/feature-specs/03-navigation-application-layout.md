# Feature 03 - Navigation & Application Layout

## Objective

Build the complete navigation architecture for AnaeCare using React Navigation. This phase establishes the application's layout, navigation flow, authentication guards, reusable screen wrappers, and global theme.

This feature does not implement business logic. It only creates the navigation framework that all future modules will use.

---

# Goals

- Configure React Navigation.
- Create Stack Navigator.
- Create Bottom Tab Navigator.
- Implement Authentication Flow.
- Implement Protected Routes.
- Create reusable screen layouts.
- Configure application theme.
- Prepare navigation for future features.

---

# Navigation Architecture

```
AnaeCare

Splash

↓

Authentication Check

↓

───────────────
Logged In?
───────────────

YES                    NO

↓                      ↓

Main App             Login

                       ↓

                   Register

                       ↓

                    Main App
```

---

# Main Application

```
Bottom Tabs

├── Home
├── History
├── Diet
└── Profile
```

---

# Stack Navigation

```
Root Stack

Splash

Authentication

    Login

    Register

Main

    Bottom Tabs

Camera

Prediction

Doctor Alert
```

---

# Folder Structure

```
navigation/

RootNavigator.tsx

AuthNavigator.tsx

MainNavigator.tsx

TabNavigator.tsx

types/

navigation.ts
```

---

# Root Navigator

Responsibilities

- Initialize application.
- Check authentication state.
- Display Splash Screen.
- Navigate to appropriate flow.

Never contain business logic.

---

# Authentication Navigator

Contains

- Login
- Register

Only accessible when the user is not authenticated.

---

# Main Navigator

Contains

- Bottom Tabs
- Camera
- Prediction
- Doctor Alert

Only accessible after login.

---

# Bottom Tabs

Tabs

```
Home

History

Diet

Profile
```

Each tab should preserve its state when switching.

---

# Screen Flow

## Home

Actions

- Scan Eye
- Upload Image
- View Recent Prediction

---

## Camera

Purpose

Capture conjunctiva image.

---

## Prediction

Purpose

Display AI prediction.

---

## History

Purpose

Display previous scans.

---

## Diet

Purpose

Display recommendations.

---

## Profile

Purpose

User account management.

---

# Theme

Create

```
theme/

colors.ts

spacing.ts

typography.ts

theme.ts
```

---

## Colors

Primary

```
#2563EB
```

Success

```
#10B981
```

Warning

```
#F59E0B
```

Danger

```
#EF4444
```

Background

```
#F8FAFC
```

Surface

```
#FFFFFF
```

---

# Typography

Font

```
Poppins
```

Fallback

```
System Font
```

---

# Shared Layout Components

Create

```
components/layout/

ScreenWrapper.tsx

SafeAreaWrapper.tsx

AppHeader.tsx

BottomTabBar.tsx
```

---

# Navigation Types

Create

```
types/

navigation.ts
```

Define

- Root Stack Params
- Auth Stack Params
- Bottom Tab Params

All navigation should be strongly typed.

---

# Authentication Guard

If

```
User Logged In
```

↓

Navigate

```
Main App
```

Else

↓

Navigate

```
Login
```

This logic should be centralized in the Root Navigator.

---

# Header Rules

All authenticated screens should include

- Screen Title
- Back Button (where applicable)
- Profile Shortcut (optional)

---

# Screen Wrapper

Every screen should use

```
<ScreenWrapper>
```

Responsibilities

- Safe Area
- Consistent padding
- Background color
- Keyboard handling

---

# Loading Flow

```
App Launch

↓

Splash Screen

↓

Check Authentication

↓

Navigate
```

No blank screen should ever appear.

---

# Reusable Components

Create

```
AppHeader

SectionTitle

PrimaryButton

SecondaryButton

EmptyState

LoadingView

ErrorView
```

---

# Acceptance Criteria

- Splash Screen displays on launch.
- Authentication flow works.
- Bottom Tab Navigation works.
- Stack Navigation works.
- Protected routes are enforced.
- Screen transitions are smooth.
- Theme is applied consistently.
- Navigation is fully type-safe.

---

# Testing Checklist

- Launch app.
- Verify Splash Screen.
- Verify Login flow.
- Verify Register flow.
- Verify Bottom Tabs.
- Verify navigation between tabs.
- Verify navigation to Camera screen.
- Verify navigation to Prediction screen.
- Verify logout returns to Login.
- Verify no navigation crashes.

---

# Deliverables

- Root Navigator
- Auth Navigator
- Main Navigator
- Bottom Tab Navigator
- Navigation Types
- Shared Screen Wrapper
- Global Theme
- Protected Routes

---

# Out of Scope

This feature does NOT include

- Camera implementation
- Image upload
- AI prediction
- Backend APIs
- Recommendation engine
- Database integration

---

# Next Feature

## Feature 04 – Home Dashboard

Implement

- Dashboard UI
- Welcome Card
- Quick Actions
- Health Tips
- Recent Prediction Card
- Navigation to Camera
- Navigation to History
- Navigation to Diet