# AnaeCare - Architecture

# Technology Stack

| Layer | Technology | Purpose |
|--------|------------|---------|
| Mobile Application | React Native + Expo | Cross-platform mobile application |
| Language | TypeScript | Type-safe development |
| Navigation | React Navigation | Screen navigation |
| State Management | Redux Toolkit | Global state management |
| Backend | FastAPI | REST API services |
| AI/ML | TensorFlow / PyTorch | Anemia prediction |
| Computer Vision | OpenCV | Image preprocessing and conjunctiva detection |
| Database | PostgreSQL | Persistent data storage |
| ORM | SQLAlchemy | Database interaction |
| Authentication | JWT | User authentication |
| Storage | Local Storage + PostgreSQL | User data and prediction history |

---

# High-Level Architecture

```
                ┌───────────────────────────────┐
                │      React Native App         │
                └──────────────┬────────────────┘
                               │
                               ▼
                    Authentication Module
                               │
                               ▼
                     Home Dashboard Module
                               │
               ┌───────────────┴───────────────┐
               │                               │
               ▼                               ▼
      Camera Capture                 Gallery Upload
               │                               │
               └───────────────┬───────────────┘
                               │
                               ▼
                  Image Quality Assessment
                               │
                               ▼
                    Image Preprocessing
                               │
                               ▼
                    Conjunctiva Detection
                               │
                               ▼
                     Feature Extraction
                               │
                               ▼
                     AI Prediction Engine
                               │
                               ▼
                  Risk Classification Engine
                               │
                               ▼
                 Recommendation Generation
                               │
                               ▼
                    Save Prediction History
                               │
                               ▼
                     Display Results Screen
```

---

# System Modules

## 1. Mobile Application

Responsibilities

- User authentication
- Image capture
- Image upload
- Display prediction
- Show recommendations
- View history
- Manage profile

---

## 2. Backend API

Responsibilities

- Receive images
- Validate requests
- Run AI prediction
- Store prediction results
- Return recommendations

---

## 3. Image Processing Module

Responsibilities

- Image validation
- Noise removal
- Resize image
- Brightness normalization
- Contrast enhancement

Output

- Clean conjunctiva image

---

## 4. Conjunctiva Detection Module

Responsibilities

- Detect eye
- Detect lower eyelid
- Locate conjunctiva region
- Crop Region of Interest (ROI)

Output

- Conjunctiva ROI

---

## 5. Feature Extraction Module

Extract

- RGB values
- HSV values
- LAB color values
- Brightness
- Redness
- Paleness
- Texture features

Output

- Feature Vector

---

## 6. AI Prediction Module

Responsibilities

- Load trained model
- Predict anemia risk
- Calculate confidence score

Output

- Low Risk
- Moderate Risk
- High Risk

---

## 7. Recommendation Module

Generate

- Diet recommendations
- Iron-rich foods
- Vitamin C foods
- Lifestyle suggestions
- Hydration advice

---

## 8. Health History Module

Store

- Prediction date
- Risk level
- Confidence score
- Recommendations

Display

- Prediction timeline
- Risk trend
- Previous scans

---

## 9. Doctor Consultation Module

Responsibilities

- Detect High Risk users
- Display consultation alert
- Suggest medical evaluation

---

# Application Layers

```
Presentation Layer

React Native Screens
Components
Navigation

↓

Business Logic Layer

Authentication
Prediction
History
Recommendations

↓

API Layer

FastAPI
REST APIs
JWT Authentication

↓

AI Layer

Image Processing

↓

Conjunctiva Detection

↓

Feature Extraction

↓

Machine Learning Model

↓

Database Layer

PostgreSQL
```

---

# Folder Structure

```
AnaeCare/

mobile/

assets/
components/
navigation/
screens/
services/
hooks/
store/
utils/
types/

backend/

app/
api/
core/
database/
models/
schemas/
services/
ml/

main.py

model/

datasets/

docs/
```

---

# API Structure

## Authentication

```
POST /auth/register

POST /auth/login

GET /auth/profile
```

---

## Prediction

```
POST /prediction/analyze

GET /prediction/history

GET /prediction/{id}
```

---

## Recommendations

```
GET /recommendation/{predictionId}
```

---

## User

```
GET /user/profile

PUT /user/profile
```

---

# Database Tables

## Users

- id
- name
- email
- password
- age
- gender
- created_at

---

## Predictions

- id
- user_id
- image_path
- prediction
- confidence
- explanation
- created_at

---

## Recommendations

- id
- prediction_id
- diet_plan
- lifestyle_tips

---

# Data Flow

```
User

↓

Capture Eye Image

↓

React Native

↓

FastAPI

↓

OpenCV

↓

Image Quality Check

↓

Conjunctiva Detection

↓

Feature Extraction

↓

Machine Learning Model

↓

Prediction

↓

Recommendation Generation

↓

Store in Database

↓

Return Response

↓

Display Result
```

---

# Design Principles

- Modular architecture.
- Separation of concerns.
- Reusable components.
- Scalable backend services.
- Secure authentication using JWT.
- AI inference isolated from UI logic.
- Clean API boundaries.
- Maintainable and testable codebase.
- Responsive mobile-first design.
- Easy integration with future healthcare services.

---

# Architecture Rules

1. The mobile application must never perform AI inference locally during the initial version.
2. All predictions must be processed through the FastAPI backend.
3. Image quality validation must occur before AI prediction.
4. Every prediction must be stored in the database.
5. Backend APIs should remain stateless.
6. Image preprocessing and AI inference must be independent modules.
7. Business logic should not be placed inside UI components.
8. Each module should have a single responsibility.
9. APIs must return consistent JSON responses.
10. The architecture should support future model upgrades without changing the mobile application.