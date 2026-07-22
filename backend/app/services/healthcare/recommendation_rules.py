def get_recommendation(risk_level: str, has_emergency_symptoms: bool = False):
    risk = risk_level.lower()
    
    emergency_warnings = [
        "Severe dizziness",
        "Fainting",
        "Chest pain",
        "Difficulty breathing",
        "Rapid heartbeat"
    ]

    if risk == "high" or has_emergency_symptoms:
        return {
            "priority": "Urgent",
            "consultationRequired": True,
            "recommendedSpecialist": "General Physician / Hematologist",
            "emergencyWarnings": emergency_warnings
        }
    elif risk == "moderate":
        return {
            "priority": "Recommended",
            "consultationRequired": True,
            "recommendedSpecialist": "General Physician",
            "emergencyWarnings": None
        }
    else:
        return {
            "priority": "Routine",
            "consultationRequired": False,
            "recommendedSpecialist": "General Physician",
            "emergencyWarnings": None
        }
