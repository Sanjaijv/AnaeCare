import cv2

def check_contrast(image, min_contrast: float = 20.0) -> bool:
    """
    Returns True if the image has sufficient contrast (RMS contrast).
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    contrast = gray.std()
    return contrast >= min_contrast
