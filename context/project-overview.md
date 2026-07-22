# AnaeCare - Project Overview

# Overview

AnaeCare is an AI-powered mobile healthcare application designed for early anemia risk screening using conjunctiva (eye) image analysis. The application provides a non-invasive, low-cost, and accessible solution that helps users assess their anemia risk without requiring immediate blood tests.

The system combines computer vision, machine learning, and basic health information to analyze conjunctiva images and classify users into Low, Moderate, or High Anemia Risk. In addition to prediction, AnaeCare provides result explanations, personalized diet recommendations, health history tracking, and doctor consultation alerts.

The application is primarily designed for rural and remote communities where laboratory facilities and healthcare professionals may not be readily available.

---

# Goals

1. Develop a non-invasive anemia screening solution.
2. Provide AI-based anemia risk prediction using conjunctiva images.
3. Improve accessibility to early anemia screening.
4. Reduce dependence on immediate laboratory blood tests.
5. Provide personalized health recommendations.
6. Maintain user health history for continuous monitoring.
7. Encourage early medical consultation for high-risk users.
8. Build a scalable mobile healthcare platform.

---

# Core User Flow

User launches the application

↓

User signs in or creates an account

↓

Home Dashboard

↓

Capture Eye Image or Upload Existing Image

↓

Image Quality Assessment

↓

Image Preprocessing

↓

Conjunctiva Detection

↓

AI-Based Anemia Prediction

↓

Risk Classification

↓

Prediction Explanation

↓

Diet Recommendations

↓

Health History Saved

↓

Doctor Consultation Alert (if High Risk)

---

# Features

## Authentication

- User Registration
- User Login
- Secure Authentication
- User Profile Management

---

## Eye Image Acquisition

- Camera Capture
- Gallery Upload
- Image Preview

---

## Image Quality Assessment

- Blur Detection
- Brightness Validation
- Eye Visibility Check
- Image Resolution Validation
- Image Acceptance/Rejection

---

## Image Processing

- Image Preprocessing
- Noise Reduction
- Color Normalization
- Conjunctiva Region Detection

---

## AI Prediction

- Feature Extraction
- Machine Learning Prediction
- Risk Classification
- Confidence Score

---

## Explainable AI

- Prediction Explanation
- Visual Indicators
- Confidence Interpretation

---

## Diet Recommendation

- Iron-rich Food Suggestions
- Vitamin C Recommendations
- Lifestyle Suggestions
- Hydration Advice

---

## Health History

- Previous Predictions
- Prediction Timeline
- Risk Trends
- User Progress

---

## Doctor Consultation

- High Risk Alert
- Consultation Recommendation
- Nearby Hospital Integration (Future)
- Emergency Guidance

---

# Scope

## In Scope

- Mobile application development using React Native.
- AI-based conjunctiva image analysis.
- Image quality validation.
- Image preprocessing.
- Conjunctiva detection.
- Anemia risk prediction.
- Prediction explanation.
- Personalized diet recommendations.
- Health history management.
- Doctor consultation alerts.
- Secure user authentication.
- Backend API integration.
- PostgreSQL database.

---

## Out of Scope

- Laboratory blood test replacement.
- Real-time hospital appointment booking.
- Wearable device integration.
- Continuous vital sign monitoring.
- Electronic Medical Record (EMR) integration.
- Multi-language support (initial version).
- iOS App Store deployment (initial phase).

---

# Success Criteria

The project will be considered successful if:

1. Users can successfully register and log in.
2. Users can capture or upload conjunctiva images.
3. The application correctly validates image quality.
4. The AI model predicts anemia risk accurately.
5. Risk is classified into Low, Moderate, or High.
6. Users receive understandable prediction explanations.
7. Personalized diet recommendations are generated.
8. Health history is stored and displayed.
9. High-risk users receive doctor consultation alerts.
10. The application provides a smooth and user-friendly experience.

---

# Future Enhancements

- Hemoglobin value estimation.
- Multi-language support.
- Cloud-based AI inference.
- Offline prediction support.
- Hospital appointment booking.
- Integration with wearable health devices.
- AI model improvement using larger datasets.
- Telemedicine integration.
- Doctor dashboard.
- Administrative dashboard.