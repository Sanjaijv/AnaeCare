from app.schemas.quality import QualityCheckResponse, QualityChecks
from app.services.quality.validators.blur import is_blurry
from app.services.quality.validators.brightness import check_brightness
from app.services.quality.validators.contrast import check_contrast
from app.services.quality.validators.resolution import check_resolution
from app.services.quality.validators.eye_visibility import check_eye_visibility
from app.services.quality.validators.conjunctiva_visibility import check_conjunctiva_visibility

def evaluate_image_quality(image) -> QualityCheckResponse:
    # Run validators
    # Note: is_blurry returns True if blurry. We want True if it PASSES (not blurry)
    passes_blur = not is_blurry(image)
    passes_brightness = check_brightness(image)
    passes_contrast = check_contrast(image)
    passes_resolution = check_resolution(image)
    passes_eye = check_eye_visibility(image)
    passes_conjunctiva = check_conjunctiva_visibility(image)
    
    checks = QualityChecks(
        blur=passes_blur,
        brightness=passes_brightness,
        contrast=passes_contrast,
        resolution=passes_resolution,
        eyeVisible=passes_eye,
        conjunctivaVisible=passes_conjunctiva
    )
    
    # Calculate score
    score = 0
    if passes_resolution:
        score += 15
    if passes_blur:
        score += 25
    if passes_brightness:
        score += 20
    if passes_contrast:
        score += 15
    if passes_eye:
        score += 15
    if passes_conjunctiva:
        score += 10
        
    # Determine status and recommendation
    if score >= 85:
        status = "Excellent"
        recommendation = "Image quality is sufficient."
        success = True
    elif 70 <= score < 85:
        status = "Acceptable"
        recommendation = "Image quality is acceptable but could be improved."
        success = True
    else:
        status = "Reject"
        success = False
        
        # Generate specific recommendation based on failures
        if not passes_resolution:
            recommendation = "Image resolution is too low."
        elif not passes_blur:
            recommendation = "The image appears blurry. Please hold the camera steady."
        elif not passes_brightness:
            recommendation = "Lighting is poor. Move to a brighter location."
        elif not passes_eye:
            recommendation = "Please keep your eye fully visible."
        elif not passes_conjunctiva:
            recommendation = "Pull down your lower eyelid slightly and retake the image."
        else:
            recommendation = "Please retake the image."
            
    return QualityCheckResponse(
        success=success,
        qualityScore=score,
        status=status,
        recommendation=recommendation,
        checks=checks
    )
