# Feature 02 - Authentication Module

## Objective

Implement a secure authentication system that allows users to register, log in, remain authenticated across app launches, and log out safely.

This module establishes user identity and protects future features such as prediction history and profile management.

---

# Goals

- User Registration
- User Login
- JWT Authentication
- Secure Token Storage
- Logout
- Auto Login
- Protected Routes
- User Session Management

---

# Authentication Flow

```
App Launch

↓

Splash Screen

↓

Check Stored Token

↓

┌───────────────┐
│ Token Exists? │
└───────┬───────┘
        │
   Yes  │  No
        │
        ▼
Validate Token

↓

Home Screen

or

↓

Login Screen
```

---

# User Flow

## Register

```
Register

↓

Validate Form

↓

POST /auth/register

↓

Success

↓

Login Screen
```

---

## Login

```
Login

↓

Validate Credentials

↓

POST /auth/login

↓

Receive JWT Token

↓

Store Token

↓

Navigate Home
```

---

## Logout

```
Profile

↓

Logout

↓

Delete Token

↓

Navigate Login
```

---

# Functional Requirements

The system shall:

- Register new users.
- Authenticate existing users.
- Store JWT securely.
- Automatically log users in if a valid token exists.
- Automatically redirect unauthenticated users to Login.
- Allow logout.
- Validate user input before API calls.

---

# Screens

## Login Screen

### Components

- Email Input
- Password Input
- Login Button
- Register Button
- Forgot Password (Future)

---

## Register Screen

### Components

- Full Name
- Email
- Password
- Confirm Password
- Age
- Gender
- Register Button

---

# Folder Changes

```
screens/

Login/

Register/

services/

auth.ts

store/

slices/

authSlice.ts

hooks/

useAuth.ts

types/

user.ts

api.ts

utils/

validators.ts
```

---

# Database Schema

## Users Table

| Field | Type |
|--------|------|
| id | UUID |
| name | String |
| email | String (Unique) |
| password_hash | String |
| age | Integer |
| gender | String |
| created_at | Timestamp |
| updated_at | Timestamp |

---

# API Endpoints

## Register

POST

```
/auth/register
```

Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "age": 22,
  "gender": "Male"
}
```

Success

```json
{
  "success": true,
  "message": "Registration successful"
}
```

---

## Login

POST

```
/auth/login
```

Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

Response

```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

## Get Profile

GET

```
/auth/profile
```

Authorization

```
Bearer <JWT>
```

---

# JWT Rules

JWT contains

- User ID
- Email
- Expiration Time

Token expires after

```
24 Hours
```

---

# Validation Rules

## Name

- Required
- Minimum 3 characters

---

## Email

- Required
- Valid email format

---

## Password

Minimum

- 8 characters

Must contain

- Uppercase
- Lowercase
- Number

---

## Confirm Password

Must match password.

---

## Age

Range

```
10–100
```

---

## Gender

Allowed

- Male
- Female
- Other

---

# State Management

Redux Slice

```
Auth State

User

Token

Loading

Error

Authenticated
```

Actions

- Login
- Logout
- Register
- Restore Session
- Update Profile

---

# Secure Storage

Store

- JWT Token
- User ID

Using

```
AsyncStorage
```

Future Enhancement

- Expo Secure Store

---

# Navigation Rules

Authenticated

```
Home

Prediction

History

Diet

Profile
```

Unauthenticated

```
Login

Register
```

---

# Error Handling

Handle

- Invalid email
- Incorrect password
- User already exists
- Network failure
- Server unavailable
- Token expired

Display user-friendly messages only.

---

# Loading States

Show loading indicator during

- Registration
- Login
- Token validation

Disable buttons while requests are in progress.

---

# Acceptance Criteria

The feature is complete when:

- User can register.
- User can log in.
- JWT is stored locally.
- App restores session on launch.
- Logout clears session.
- Protected screens require authentication.
- Validation works correctly.
- Error messages are displayed appropriately.
- No crashes occur during authentication flow.

---

# Testing Checklist

- Register with valid details.
- Attempt duplicate registration.
- Login with valid credentials.
- Login with invalid password.
- Login with invalid email.
- Restart app and verify session restoration.
- Logout and verify token removal.
- Attempt to access protected screens without login.

---

# Deliverables

- Registration Screen
- Login Screen
- Authentication API Integration
- Redux Authentication Slice
- JWT Storage
- Protected Navigation
- Session Restoration
- Logout Functionality

---

# Out of Scope

This feature does NOT include:

- Camera
- Image Upload
- AI Prediction
- Health History
- Recommendations
- Doctor Alerts
- Social Login
- Password Reset

---

# Next Feature

## Feature 03 – Navigation & Application Layout

Implement:

- Bottom Tab Navigation
- Stack Navigation
- Global Theme
- Shared Layout
- Screen Wrappers
- Navigation Guards
- App Shell