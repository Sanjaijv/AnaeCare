# Feature 01 - Project Foundation

## Objective

Establish the complete project foundation for AnaeCare using React Native (Expo), TypeScript, FastAPI, and PostgreSQL. This phase creates the application architecture, installs dependencies, configures navigation, state management, networking, and reusable UI components.

No business logic or AI functionality should be implemented in this phase.

---

# Goals

- Create a scalable project structure.
- Configure React Native with Expo.
- Setup TypeScript.
- Configure React Navigation.
- Configure Redux Toolkit.
- Configure Axios.
- Configure environment variables.
- Create reusable UI components.
- Create placeholder screens.
- Verify the application builds successfully.

---

# Tech Stack

## Mobile

- React Native
- Expo
- TypeScript

## Navigation

- React Navigation

## State Management

- Redux Toolkit

## Networking

- Axios

## Storage

- AsyncStorage

## UI

- React Native Paper

## Icons

- Expo Vector Icons

---

# Functional Requirements

The application should:

- Launch successfully.
- Display a Splash Screen.
- Navigate to Login.
- Contain placeholder screens.
- Use Stack Navigation.
- Support future Bottom Tab Navigation.
- Have a reusable folder structure.
- Be ready for backend integration.

---

# Folder Structure

```
AnaeCare/

mobile/

assets/
    images/
    icons/
    fonts/

components/
    common/
    buttons/
    cards/
    inputs/
    loaders/

navigation/

screens/

    Splash/

    Login/

    Register/

    Home/

    Camera/

    Prediction/

    History/

    Diet/

    Profile/

services/

    api.ts

    auth.ts

store/

    slices/

hooks/

utils/

types/

constants/

theme/

App.tsx

```

---

# Install Dependencies

## Navigation

```bash
npm install @react-navigation/native
```

```bash
npm install @react-navigation/native-stack
```

```bash
npx expo install react-native-screens
```

```bash
npx expo install react-native-safe-area-context
```

---

## UI

```bash
npm install react-native-paper
```

```bash
npx expo install @expo/vector-icons
```

---

## Networking

```bash
npm install axios
```

---

## State Management

```bash
npm install @reduxjs/toolkit
```

```bash
npm install react-redux
```

---

## Storage

```bash
npx expo install @react-native-async-storage/async-storage
```

---

## Camera

```bash
npx expo install expo-camera
```

```bash
npx expo install expo-image-picker
```

---

## Forms

```bash
npm install react-hook-form
```

---

## Validation

```bash
npm install zod
```

---

# Navigation Structure

```
Stack Navigator

↓

Splash

↓

Login

↓

Register

↓

Home

↓

Camera

↓

Prediction

↓

History

↓

Diet

↓

Profile
```

---

# Screens To Create

## Splash Screen

Purpose

Application loading.

---

## Login Screen

Purpose

User authentication.

---

## Register Screen

Purpose

User registration.

---

## Home Screen

Purpose

Dashboard.

---

## Camera Screen

Purpose

Capture conjunctiva image.

---

## Prediction Screen

Purpose

Display prediction.

---

## History Screen

Purpose

Show previous scans.

---

## Diet Screen

Purpose

Display recommendations.

---

## Profile Screen

Purpose

User profile.

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

# Services

Create

```
services/

api.ts

auth.ts

prediction.ts

history.ts
```

---

# Redux

Create

```
store/

store.ts

slices/

authSlice.ts

predictionSlice.ts

historySlice.ts
```

---

# Constants

Create

```
constants/

routes.ts

api.ts

strings.ts
```

---

# Utils

Create

```
utils/

validators.ts

permissions.ts

imageUtils.ts

dateUtils.ts
```

---

# Types

Create

```
types/

user.ts

prediction.ts

navigation.ts

api.ts
```

---

# Reusable Components

Create

```
Button

Card

Input

Loader

Header

Screen

EmptyState

ErrorView
```

Each component should be reusable across the application.

---

# Environment Variables

Create

```
.env

EXPO_PUBLIC_API_URL=
```

Never hardcode API URLs.

---

# App Entry

Responsibilities

- Load theme
- Initialize Redux
- Configure Navigation
- Setup Providers

No application logic.

---

# Acceptance Criteria

The feature is complete when:

- Expo project builds successfully.
- Folder structure is created.
- Navigation works.
- Placeholder screens exist.
- Redux is configured.
- Axios is configured.
- Theme is configured.
- No TypeScript errors.
- No ESLint errors.
- Project runs on Android emulator.

---

# Testing Checklist

- Application launches.
- Splash Screen loads.
- Navigation works.
- All screens open.
- No crashes.
- No warnings.
- No red screens.
- TypeScript compilation succeeds.

---

# Deliverables

- Working Expo application.
- Project folder structure.
- Navigation setup.
- Theme configuration.
- Redux configuration.
- Axios configuration.
- Placeholder screens.
- Reusable UI components.

---

# Out of Scope

This phase does NOT include:

- Authentication
- Backend APIs
- Database
- Camera functionality
- AI model
- Image upload
- Prediction
- Recommendation engine

These will be implemented in later feature specifications.

---

# Next Feature

Feature 02 - Authentication

Implement:

- User Registration
- User Login
- JWT Authentication
- Secure Token Storage
- Logout
- Protected Navigation