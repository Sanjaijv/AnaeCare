# Feature 15 - User Profile & Health Profile

## Objective

Implement the User Profile and Health Profile module to allow users to securely manage their personal information, health details, symptoms, and application preferences.

This module provides the personal information required to personalize anemia screening, diet recommendations, and future AI improvements.

This feature does not include authentication or cloud synchronization.

---

# Goals

- Create a complete user profile.
- Store demographic information.
- Store health information.
- Manage symptoms.
- Configure application preferences.
- Manage notification settings.
- Manage privacy settings.
- Prepare data for future personalization.

---

# Pipeline Position

```
Authentication

↓

User Profile

↓

Health Profile

↓

Anemia Screening

↓

Prediction

↓

Diet Recommendation

↓

History
```

---

# Functional Requirements

The system shall

- View profile.
- Edit profile.
- Update health information.
- Record symptoms.
- Manage notification preferences.
- Manage privacy preferences.
- Store emergency contact (future).
- Support local persistence.

---

# Folder Structure

```
backend/

app/

routers/

profile.py

schemas/

profile.py

services/

profile/

profile_service.py

profile_repository.py

mobile/

screens/

Profile/

ProfileScreen.tsx

EditProfileScreen.tsx

HealthProfileScreen.tsx

SettingsScreen.tsx

components/

profile/

ProfileCard.tsx

HealthInfoCard.tsx

SymptomsCard.tsx

NotificationCard.tsx

PrivacyCard.tsx

ProfileAvatar.tsx

EditableField.tsx

store/

profileSlice.ts
```

---

# User Profile

Fields

```
Full Name

Age

Gender

Height

Weight

Phone Number

Email (Future)

Profile Photo (Future)
```

---

# Health Profile

Fields

```
Blood Group

Known Medical Conditions

Current Medications

Previous Anemia Diagnosis

Iron Supplement Usage

Pregnancy Status

Vegetarian / Non-Vegetarian

Smoking Status

Alcohol Consumption
```

---

# Symptoms

Users can select symptoms such as

- Fatigue
- Weakness
- Dizziness
- Headache
- Pale Skin
- Shortness of Breath
- Cold Hands
- Chest Pain
- Rapid Heartbeat

Multiple selections are supported.

---

# Notification Settings

Options

```
Daily Health Tips

Weekly Reminder

Monthly Screening Reminder

Diet Reminder
```

---

# Privacy Settings

Options

```
Store Images

Store Prediction History

Share Anonymous Data

Allow Analytics
```

---

# Profile Screen

Layout

```
Header

↓

Profile Card

↓

Health Information

↓

Symptoms

↓

Preferences

↓

Settings

↓

Logout (Future)
```

---

# Edit Profile Screen

Editable fields

- Name
- Age
- Height
- Weight
- Gender

Validation

- Age > 0
- Height > 0
- Weight > 0

---

# Health Profile Screen

Display

- Medical History
- Symptoms
- Lifestyle
- Dietary Preferences

---

# Settings Screen

Sections

- Notifications
- Privacy
- About
- App Version
- Terms & Conditions
- Privacy Policy

---

# Components

## ProfileCard

Displays

- Avatar
- Name
- Age
- Gender

---

## HealthInfoCard

Displays

- Height
- Weight
- Blood Group
- Medical History

---

## SymptomsCard

Displays

Selected symptoms as chips.

---

## NotificationCard

Displays

Notification toggles.

---

## PrivacyCard

Displays

Privacy options.

---

## EditableField

Reusable editable input component.

---

# Backend API

## GET

```
/api/v1/profile
```

Returns profile information.

---

## POST

```
/api/v1/profile
```

Creates profile.

---

## PUT

```
/api/v1/profile
```

Updates profile.

---

# Database Schema

```
id

name

age

gender

height

weight

bloodGroup

medicalHistory

symptoms

dietPreference

notifications

privacySettings

createdAt

updatedAt
```

---

# State Management

Redux Slice

```
profile

↓

loading

user

healthProfile

symptoms

preferences

error
```

---

# Error Handling

Handle

- Invalid input.
- Missing required fields.
- Save failure.
- Network timeout.

Display clear validation messages.

---

# Accessibility

- Large form controls.
- Screen reader labels.
- High-contrast UI.
- Keyboard-friendly navigation.

---

# Performance

- Cache profile locally.
- Load profile once per session.
- Persist changes automatically.

---

# Acceptance Criteria

The feature is complete when

- Profile can be viewed.
- Profile can be edited.
- Health profile can be updated.
- Symptoms can be selected.
- Notification settings work.
- Privacy settings work.
- Changes persist locally.
- Validation works correctly.

---

# Testing Checklist

- Create new profile.
- Edit profile.
- Update health information.
- Select symptoms.
- Toggle notifications.
- Toggle privacy settings.
- Verify local persistence.
- Verify responsive layout.

---

# Deliverables

- Profile API
- Profile Service
- Profile Repository
- ProfileScreen
- EditProfileScreen
- HealthProfileScreen
- SettingsScreen
- Profile Redux Slice

---

# Out of Scope

This feature does NOT include

- Authentication
- Cloud synchronization
- Social login
- Password management
- Multi-user support

---

# Future Enhancements

- Profile photo upload.
- Cloud profile synchronization.
- Family member profiles.
- Doctor profile sharing.
- Multi-language preferences.
- Emergency contact management.

---

# Medical Responsibility

Personal health information should be handled securely and used only to personalize screening results and recommendations. AnaeCare must clearly inform users how their data is stored and provide options to control privacy settings.

---

# Next Feature

## Feature 16 - Doctor Consultation & Nearby Healthcare

Implement

- Nearby hospitals and clinics
- Doctor consultation recommendations
- Emergency guidance
- Healthcare facility search
- Google Maps integration
- Appointment links
- Contact information
- Risk-based consultation prompts