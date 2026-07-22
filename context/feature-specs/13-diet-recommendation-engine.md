# Feature 13 - Diet Recommendation Engine

## Objective

Implement the Diet Recommendation Engine to provide personalized nutritional guidance based on the user's anemia risk level, demographic information, and reported symptoms.

The recommendation engine should generate practical dietary advice, educational content, hydration guidance, and lifestyle recommendations to encourage healthier habits and early intervention.

This module is intended for health awareness and should not replace professional medical or nutritional advice.

---

# Goals

- Generate personalized diet recommendations.
- Recommend iron-rich foods.
- Recommend Vitamin C-rich foods.
- Suggest foods to avoid.
- Provide hydration guidance.
- Provide lifestyle recommendations.
- Deliver educational health content.
- Adapt recommendations based on AI prediction.

---

# Pipeline Position

```
Camera

↓

Image Quality Assessment

↓

Image Preprocessing

↓

Conjunctiva Detection

↓

Feature Extraction

↓

AI Prediction

↓

Prediction Results

↓

Diet Recommendation

↓

Health History
```

---

# Functional Requirements

The system shall

- Read the prediction result.
- Determine the user's risk level.
- Generate personalized recommendations.
- Display categorized food suggestions.
- Display hydration advice.
- Display lifestyle recommendations.
- Display educational tips.
- Allow bookmarking favorite recommendations (future).

---

# Folder Structure

```
backend/

app/

services/

recommendation/

recommendation_service.py

diet_engine.py

rules/

low_risk.py

moderate_risk.py

high_risk.py

nutrition_database.py

hydration.py

education.py

routers/

recommendation.py

schemas/

recommendation.py

mobile/

screens/

Diet/

DietScreen.tsx

components/

diet/

RiskSummaryCard.tsx

FoodCategoryCard.tsx

FoodItemCard.tsx

HydrationCard.tsx

LifestyleCard.tsx

EducationCard.tsx

MealSuggestionCard.tsx

store/

dietSlice.ts
```

---

# Recommendation Pipeline

```
Prediction Result

↓

Risk Level

↓

Recommendation Engine

↓

Nutrition Rules

↓

Lifestyle Rules

↓

Hydration Rules

↓

Educational Content

↓

Display Recommendations
```

---

# Recommendation Categories

## Iron-Rich Foods

Examples

- Spinach
- Beetroot
- Lentils
- Chickpeas
- Beans
- Tofu
- Eggs
- Lean Red Meat
- Chicken Liver
- Fish

---

## Vitamin C Foods

Examples

- Orange
- Lemon
- Guava
- Kiwi
- Strawberry
- Bell Pepper
- Tomato
- Broccoli

---

## Foods That Reduce Iron Absorption

Examples

- Tea
- Coffee
- Carbonated drinks

Display guidance

```
Avoid consuming these immediately before or after iron-rich meals.
```

---

## Hydration

Suggestions

- Drink 2–3 liters of water daily.
- Stay hydrated during physical activity.
- Avoid excessive sugary drinks.

---

## Lifestyle

Examples

- Get adequate sleep.
- Exercise regularly.
- Avoid skipping meals.
- Schedule regular health checkups.

---

# Risk-Based Recommendations

## Low Risk

Display

- Maintain balanced diet.
- Continue healthy habits.
- Preventive education.

---

## Moderate Risk

Display

- Increase dietary iron.
- Pair iron-rich foods with Vitamin C.
- Monitor symptoms.
- Consider consulting a healthcare provider if symptoms persist.

---

## High Risk

Display

- Increase iron-rich foods immediately.
- Consume Vitamin C with meals.
- Consult a healthcare professional.
- Obtain a laboratory hemoglobin test.
- Continue following medical advice.

---

# Backend API

GET

```
/api/v1/recommendation/{riskLevel}
```

Example Response

```json
{
    "success": true,
    "risk": "Moderate",
    "foods": {
        "iron": [
            "Spinach",
            "Lentils",
            "Beans"
        ],
        "vitaminC": [
            "Orange",
            "Guava"
        ],
        "avoid": [
            "Tea",
            "Coffee"
        ]
    },
    "hydration": [
        "Drink 2–3 liters of water daily."
    ],
    "lifestyle": [
        "Exercise regularly.",
        "Maintain a balanced diet."
    ],
    "education": [
        "Vitamin C improves iron absorption."
    ]
}
```

---

# Frontend Screen

## DietScreen

Layout

```
Header

↓

Risk Summary

↓

Iron-Rich Foods

↓

Vitamin C Foods

↓

Foods to Avoid

↓

Hydration

↓

Lifestyle

↓

Educational Tips
```

---

# Components

## RiskSummaryCard

Displays

- Risk Level
- Quick Recommendation

---

## FoodCategoryCard

Displays

Food category title.

---

## FoodItemCard

Displays

- Food Image
- Food Name
- Short Benefit

---

## HydrationCard

Displays hydration guidance.

---

## LifestyleCard

Displays healthy lifestyle recommendations.

---

## EducationCard

Displays educational facts.

---

## MealSuggestionCard

Future feature for sample meal plans.

---

# State Management

Redux Slice

```
diet

↓

loading

risk

foods

hydration

lifestyle

education

error
```

---

# Error Handling

Handle

- Missing recommendations.
- Invalid risk level.
- Backend unavailable.
- Network timeout.

Display fallback educational advice if recommendations cannot be loaded.

---

# Accessibility

- High-contrast colors.
- Readable typography.
- Food images with descriptive labels.
- Screen reader support.
- Large touch targets.

---

# Performance

- Cache recommendations locally.
- Avoid unnecessary API requests.
- Load images lazily.

---

# Acceptance Criteria

The feature is complete when

- Risk-specific recommendations are displayed.
- Iron-rich foods are listed.
- Vitamin C foods are listed.
- Foods to avoid are displayed.
- Hydration guidance is shown.
- Lifestyle recommendations are displayed.
- Educational content is displayed.
- Navigation works correctly.

---

# Testing Checklist

- Verify Low Risk recommendations.
- Verify Moderate Risk recommendations.
- Verify High Risk recommendations.
- Verify API response mapping.
- Verify empty-state handling.
- Verify offline fallback.
- Verify responsive layout.
- Verify accessibility.

---

# Deliverables

- Diet Recommendation API
- Recommendation Service
- Nutrition Rules Engine
- DietScreen
- RiskSummaryCard
- FoodCategoryCard
- FoodItemCard
- HydrationCard
- LifestyleCard
- EducationCard
- Redux Diet State

---

# Out of Scope

This feature does NOT include

- Personalized calorie calculation
- Medical prescriptions
- Supplement recommendations
- Doctor consultation booking
- Grocery shopping integration

---

# Future Enhancements

- Personalized meal planner.
- Weekly diet plans.
- Nutritional intake tracking.
- Barcode food scanner.
- Regional cuisine recommendations.
- Allergy-aware food suggestions.
- Integration with dietitian services.

---

# Medical Responsibility

AnaeCare provides educational nutrition guidance based on AI-assisted screening results.

The recommendations are intended to promote healthy habits and awareness. They are **not a substitute for diagnosis, treatment, or individualized medical advice**. Users with moderate or high risk should be encouraged to consult a qualified healthcare professional for appropriate evaluation and laboratory testing.

---

# Next Feature

## Feature 14 - Health History & Progress Tracking

Implement

- Prediction history
- Timeline view
- Risk trend visualization
- Previous scan comparison
- Search and filtering
- Statistics dashboard
- Local and backend synchronization
- Progress monitoring