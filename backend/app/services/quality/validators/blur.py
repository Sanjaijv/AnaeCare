import cv2

def is_blurry(image, threshold: float = 100.0) -> bool:
    """
    Returns True if the image is considered blurry using the variance of Laplacian.
    Returns False if it is sharp.
    Note: The validation check in the API needs to be whether it *passes* the check.
    So a blurry image returns True from this function, but the check should be not blurry.
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    variance = cv2.Laplacian(gray, cv2.CV_64F).var()
    return variance < threshold
