# Feature 16 - Doctor Consultation & Nearby Healthcare

## Objective

Implement the Doctor Consultation and Nearby Healthcare module to guide users toward appropriate medical care after receiving an anemia risk assessment.

The module should recommend professional medical consultation based on the user's risk level, display nearby hospitals and clinics, provide emergency guidance, and offer educational information.

This feature assists users in taking appropriate next steps after AI-based screening.

---

# Goals

- Recommend doctor consultation.
- Display nearby hospitals.
- Display nearby clinics.
- Integrate Google Maps.
- Provide emergency guidance.
- Display hospital contact information.
- Suggest specialist consultation.
- Encourage laboratory confirmation.

---

# Pipeline Position

```
AI Prediction

↓

Prediction Results

↓

Diet Recommendation

↓

Health History

↓

Doctor Consultation

↓

Healthcare Support
```

---

# Functional Requirements

The system shall

- Determine if consultation is recommended.
- Display nearby hospitals.
- Display nearby clinics.
- Display specialist recommendations.
- Open navigation in Google Maps.
- Allow phone calls to hospitals.
- Display emergency guidance.
- Provide educational advice.

---

# Folder Structure

```
backend/

app/

routers/

healthcare.py

schemas/

healthcare.py

services/

healthcare/

healthcare_service.py

hospital_service.py

maps_service.py

recommendation_service.py

mobile/

screens/

Healthcare/

HealthcareScreen.tsx

HospitalDetailsScreen.tsx

components/

healthcare/

ConsultationCard.tsx

HospitalCard.tsx

MapPreview.tsx

EmergencyCard.tsx

SpecialistCard.tsx

ActionButtons.tsx

store/

healthcareSlice.ts
```

---

# Consultation Logic

## Low Risk

Display

```
No immediate medical consultation is required.

Continue maintaining a healthy lifestyle.
```

---

## Moderate Risk

Display

```
Consider scheduling a routine consultation with a healthcare professional.

A laboratory hemoglobin test is recommended.
```

---

## High Risk

Display

```
Consult a healthcare professional as soon as possible.

Laboratory testing is strongly recommended.
```

---

# Nearby Healthcare

Display

- Hospital Name
- Distance
- Address
- Phone Number
- Opening Hours
- Rating (if available)

---

# Hospital Card

Display

```
Hospital Name

Distance

Open Now

Call

Directions
```

---

# Google Maps Integration

Actions

```
Open in Google Maps

↓

Navigation
```

---

# Phone Integration

Actions

```
Call Hospital

↓

Phone Dialer
```

---

# Emergency Guidance

Display

```
Seek immediate medical attention if you experience:

• Severe dizziness

• Fainting

• Chest pain

• Difficulty breathing

• Rapid heartbeat
```

---

# Specialist Recommendation

Recommend

- General Physician
- Internal Medicine Specialist
- Hematologist (when appropriate)

---

# Backend API

## GET

```
/api/v1/healthcare/nearby
```

Query Parameters

```
Latitude

Longitude

Radius
```

---

## GET

```
/api/v1/healthcare/recommendation/{riskLevel}
```

Returns consultation guidance.

---

# Example API Response

```json
{
  "success": true,
  "risk": "High",
  "consultationRequired": true,
  "recommendedSpecialist": "General Physician",
  "hospitals": [
    {
      "name": "City General Hospital",
      "distance": "2.3 km",
      "phone": "+91-9876543210",
      "address": "123 Main Road"
    }
  ]
}
```

---

# Frontend Screen

## HealthcareScreen

Layout

```
Header

↓

Consultation Card

↓

Nearby Hospitals

↓

Specialist Recommendation

↓

Emergency Guidance

↓

Action Buttons
```

---

# Components

## ConsultationCard

Displays

- Risk Level
- Consultation Recommendation

---

## HospitalCard

Displays

- Name
- Distance
- Address
- Call Button
- Directions Button

---

## MapPreview

Displays

Mini map preview.

---

## EmergencyCard

Displays

Emergency warning signs.

---

## SpecialistCard

Displays

Recommended healthcare professional.

---

## ActionButtons

Buttons

```
Open Maps

Call Hospital

Back to Home
```

---

# State Management

Redux Slice

```
healthcare

↓

loading

consultation

hospitals

selectedHospital

error
```

---

# Error Handling

Handle

- Location permission denied.
- GPS unavailable.
- No nearby hospitals found.
- Network timeout.
- Maps unavailable.

Provide fallback guidance.

---

# Accessibility

- Large buttons.
- Screen reader support.
- High-contrast maps and cards.
- Clear icons with text labels.

---

# Performance

- Cache nearby hospital results.
- Fetch only when location changes.
- Lazy-load map previews.

---

# Acceptance Criteria

The feature is complete when

- Consultation recommendation displays correctly.
- Nearby hospitals are listed.
- Google Maps opens correctly.
- Phone dialer opens correctly.
- Emergency guidance is displayed.
- Navigation functions properly.
- Responsive layout works across devices.

---

# Testing Checklist

- Test Low Risk recommendations.
- Test Moderate Risk recommendations.
- Test High Risk recommendations.
- Verify location permissions.
- Verify nearby hospital search.
- Verify Google Maps integration.
- Verify phone dialing.
- Verify error handling.
- Verify accessibility.

---

# Deliverables

- Healthcare API
- Healthcare Service
- HealthcareScreen
- HospitalDetailsScreen
- ConsultationCard
- HospitalCard
- EmergencyCard
- SpecialistCard
- Healthcare Redux Slice

---

# Out of Scope

This feature does NOT include

- Online doctor appointments
- Telemedicine integration
- Electronic health records
- Prescription management
- Ambulance booking

---

# Future Enhancements

- Telemedicine integration.
- Online appointment booking.
- Doctor reviews and ratings.
- Hospital wait times.
- Insurance provider integration.
- Emergency ambulance services.

---

# Medical Responsibility

AnaeCare provides healthcare guidance based on AI-assisted screening results. Recommendations are intended to encourage timely medical consultation and should not be interpreted as a diagnosis or substitute for professional medical advice.

---

# Next Feature

## Feature 17 - Authentication & Cloud Synchronization

Implement

- User authentication
- Secure login and registration
- JWT-based backend authentication
- Cloud profile synchronization
- Secure storage of prediction history
- Multi-device synchronization
- Password reset
- Session management