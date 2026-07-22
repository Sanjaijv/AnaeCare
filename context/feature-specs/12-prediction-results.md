# Feature 12 - Prediction Results

## Objective

Develop the Prediction Results module to present the AI prediction in a clear, understandable, and medically responsible manner.

This module displays the anemia risk classification, confidence score, explanation, probability distribution, and recommended next steps. It acts as the bridge between AI prediction and user guidance.

This feature does not generate recommendations or save results to the database.

---

# Goals

- Display anemia risk classification.
- Display confidence score.
- Display AI explanation.
- Display probability distribution.
- Show health summary.
- Show next steps.
- Allow navigation to recommendations.
- Allow saving and sharing (future).

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

History
```

---

# Functional Requirements

The system shall

- Display prediction status.
- Display risk level.
- Display confidence score.
- Display AI explanation.
- Display probability chart.
- Display medical disclaimer.
- Display next recommended action.
- Allow navigation to Diet Recommendation.

---

# Folder Structure

```
mobile/

screens/

PredictionResult/

PredictionResultScreen.tsx

components/

predictionResult/

RiskCard.tsx

ConfidenceCard.tsx

ProbabilityCard.tsx

ExplanationCard.tsx

HealthSummaryCard.tsx

DisclaimerCard.tsx

ActionButtons.tsx

RiskTimeline.tsx

store/

predictionResultSlice.ts
```

---

# Screen Layout

```
Safe Area

↓

Header

↓

Risk Card

↓

Confidence Card

↓

Probability Chart

↓

AI Explanation

↓

Health Summary

↓

Medical Disclaimer

↓

Action Buttons
```

---

# Risk Card

Display

- Risk Level
- Risk Color
- Status Icon

Risk Levels

```
Low Risk
```

Green

---

```
Moderate Risk
```

Orange

---

```
High Risk
```

Red

---

# Confidence Card

Display

```
Confidence

92%
```

Also display

```
Prediction Reliability

High
```

---

# Probability Card

Display probability distribution.

Example

```
Low

10%

Moderate

18%

High

72%
```

Use

- Progress bars
- Horizontal chart

---

# AI Explanation

Display

Top contributing factors.

Example

```
• Reduced conjunctival redness

• Increased paleness

• Lower LAB-A value
```

Do not expose technical ML details.

---

# Health Summary

Example

```
Your eye image shows features commonly associated with a higher risk of anemia.

This is only a screening result and not a medical diagnosis.
```

---

# Medical Disclaimer

Always display

```
AnaeCare provides an AI-assisted screening result.

It does not diagnose anemia.

Please consult a healthcare professional for laboratory confirmation.
```

This disclaimer is mandatory.

---

# Action Buttons

Buttons

```
View Diet Plan
```

↓

Navigate to Diet Recommendation

---

```
View History
```

↓

Navigate to Prediction History

---

```
Scan Again
```

↓

Navigate to Camera

---

Future

```
Share Result
```

```
Download PDF
```

---

# Risk Visualization

Use

- Color Badge
- Circular Indicator
- Risk Label

Example

```
HIGH RISK

🔴
```

---

# State Management

Redux Slice

```
predictionResult

↓

risk

confidence

probabilities

summary

explanation

processingTime

timestamp
```

---

# Error Handling

Handle

- Missing prediction.
- Invalid data.
- Backend timeout.
- Navigation failure.

Display user-friendly messages.

---

# Accessibility

- Large readable fonts.
- Screen reader labels.
- Icons paired with text.
- High contrast colors.
- Do not rely solely on color.

---

# Performance

The screen should load instantly using the prediction already stored in Redux.

No additional backend call should be made.

---

# Acceptance Criteria

The feature is complete when

- Risk level is displayed correctly.
- Confidence score is shown.
- Probability chart renders correctly.
- AI explanation is displayed.
- Medical disclaimer is always visible.
- Navigation buttons work.
- Layout is responsive.
- No additional API calls are made.

---

# Testing Checklist

- Verify Low Risk display.
- Verify Moderate Risk display.
- Verify High Risk display.
- Verify confidence rendering.
- Verify explanation rendering.
- Verify disclaimer visibility.
- Verify button navigation.
- Verify responsive layout.
- Verify accessibility labels.

---

# Deliverables

- PredictionResultScreen
- RiskCard
- ConfidenceCard
- ProbabilityCard
- ExplanationCard
- HealthSummaryCard
- DisclaimerCard
- ActionButtons
- PredictionResult Redux Slice

---

# Out of Scope

This feature does NOT include

- Diet recommendation generation
- Prediction history storage
- Doctor consultation alerts
- PDF export
- Sharing functionality

---

# UI Design Guidelines

- Use calm, healthcare-focused colors.
- Never use alarming language.
- Clearly distinguish between "screening" and "diagnosis."
- Present information in simple, non-technical language.
- Make the primary call-to-action obvious.

---

# Future Enhancements

- PDF report generation.
- Share prediction with doctor.
- Risk trend comparison.
- Multi-language support.
- Audio explanation.
- Doctor dashboard integration.

---

# Next Feature

## Feature 13 - Diet Recommendation Engine

Implement

- Personalized diet recommendations
- Iron-rich food suggestions
- Vitamin C pairing recommendations
- Foods to avoid
- Hydration guidance
- Meal planning
- Educational content
- Risk-specific recommendations