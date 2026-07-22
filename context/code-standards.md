# AnaeCare - Code Standards

# General Principles

These standards ensure that the AnaeCare codebase remains clean, maintainable, scalable, and easy to understand.

All developers should follow these guidelines throughout the project.

---

# General Rules

- Keep functions small and focused.
- Follow the Single Responsibility Principle.
- Avoid duplicate code.
- Write readable and self-documenting code.
- Prefer reusable components over repeated code.
- Keep business logic separate from UI.
- Always fix the root cause instead of adding temporary workarounds.
- Use meaningful variable and function names.
- Write code that is easy to test.

---

# Naming Conventions

## Variables

Use camelCase.

Example

```ts
const userName
const imageQuality
const predictionResult
```

---

## Functions

Use camelCase and descriptive names.

```ts
captureImage()
uploadImage()
predictAnemia()
fetchHistory()
```

---

## Components

Use PascalCase.

```text
LoginScreen
HomeScreen
PredictionCard
ImageUploader
HistoryCard
```

---

## Interfaces

Use PascalCase.

```ts
interface User {}

interface Prediction {}

interface Recommendation {}
```

---

## Files

Use PascalCase for React components.

```
LoginScreen.tsx

HistoryScreen.tsx

PredictionCard.tsx
```

Use camelCase for utility files.

```
api.ts

storage.ts

imageUtils.ts
```

---

# React Native Standards

## Components

- Use Functional Components only.
- Use Hooks instead of class components.
- Keep components focused on one responsibility.
- Extract repeated UI into reusable components.

Good

```
components/

Button/

Card/

PredictionCard/

Loading/

Header/
```

Bad

One component containing an entire screen.

---

## State Management

Use

- Redux Toolkit

or

- React Context (only for small shared state)

Avoid unnecessary global state.

---

## Styling

Use

- StyleSheet.create()

Avoid

- Inline styles

Good

```ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

Bad

```tsx
<View style={{ flex: 1 }}>
```

---

## Navigation

Use React Navigation.

Keep navigation logic inside

```
navigation/
```

Never place navigation logic inside reusable UI components.

---

## Screens

Each screen should only handle

- UI
- User interaction
- API calls through services

Avoid business logic inside screens.

---

# TypeScript Standards

Strict mode must always remain enabled.

Avoid

```ts
any
```

Prefer

```ts
interface
```

instead of

```ts
type

```

for data models.

Always define interfaces for

- API responses
- Database models
- Navigation params
- Component props

Example

```ts
interface User {
    id: number
    name: string
    email: string
}
```

---

# Folder Organization

```
src/

components/

screens/

navigation/

services/

hooks/

store/

types/

utils/

assets/
```

Every folder should have a single responsibility.

---

# Backend Standards

Backend uses

- FastAPI
- SQLAlchemy
- PostgreSQL

---

## API Design

Each feature should have its own router.

Example

```
routers/

auth.py

prediction.py

history.py

recommendation.py
```

---

## API Responses

Always return consistent JSON.

Example

```json
{
    "success": true,
    "message": "Prediction completed",
    "data": {}
}
```

Error

```json
{
    "success": false,
    "message": "Invalid image",
    "error": {}
}
```

---

## Validation

Always validate

- Images
- User input
- Request body
- Authentication tokens

Never trust client input.

---

# Database Standards

Use

- PostgreSQL
- SQLAlchemy
- Alembic

Never write raw SQL unless necessary.

Use

- Foreign keys
- Relationships
- Proper indexing

---

# AI Module Standards

Separate AI into independent modules.

```
ml/

preprocessing/

conjunctiva/

features/

models/

inference/

explainability/
```

Each module should perform only one task.

---

# Image Processing Standards

Pipeline must always follow

```
Input Image

↓

Quality Check

↓

Resize

↓

Noise Removal

↓

Normalization

↓

Conjunctiva Detection

↓

Feature Extraction
```

Never skip Image Quality Assessment.

---

# Machine Learning Standards

Separate

Training

Inference

Evaluation

Do not mix them together.

Example

```
training.py

evaluate.py

predict.py
```

---

# Explainable AI

Every prediction should include

- Risk level
- Confidence score
- Explanation

Example

```
High Risk

Confidence

92%

Reason

Conjunctiva appears pale with significantly reduced redness.
```

---

# Logging

Use structured logging.

Log

- API requests
- Prediction requests
- Errors
- Authentication events

Do not log

- Passwords
- Personal health information
- JWT tokens

---

# Error Handling

Always handle

- Camera failure
- Upload failure
- Invalid image
- API timeout
- AI model failure
- Database failure

Show meaningful messages to users.

Avoid exposing internal system errors.

---

# Security Standards

Passwords

- Store using hashing

Authentication

- JWT

API

- HTTPS only

Validate

- Uploaded images
- File size
- File type

Never expose sensitive user information.

---

# Git Standards

Branch names

```
feature/login

feature/camera

feature/prediction

bugfix/image-upload

hotfix/api
```

Commit messages

Good

```
Add login authentication

Implement camera module

Create prediction API

Fix image upload bug
```

Bad

```
Update

Changes

Fix

Done
```

---

# Performance Guidelines

- Optimize images before upload.
- Lazy load screens where appropriate.
- Avoid unnecessary re-renders.
- Cache API responses when possible.
- Reuse components.
- Keep bundle size small.

---

# Documentation

Every important function should include comments explaining

- Purpose
- Parameters
- Return value

Complex AI logic should always be documented.

---

# Development Rules

Always

✅ Keep modules independent.

✅ Write reusable code.

✅ Validate all inputs.

✅ Keep UI separate from business logic.

✅ Follow the project folder structure.

✅ Maintain consistent naming conventions.

✅ Write scalable code.

Never

❌ Hardcode API URLs.

❌ Store secrets in source code.

❌ Mix AI logic with UI components.

❌ Duplicate business logic.

❌ Ignore error handling.

❌ Skip image validation before prediction.

❌ Commit sensitive information to Git.

---

# Project Philosophy

AnaeCare should be developed as a modular, scalable, secure, and maintainable healthcare application. Every feature should be easy to understand, test, extend, and replace without affecting the rest of the system.