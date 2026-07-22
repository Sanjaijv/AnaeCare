import cv2
import numpy as np

def check_conjunctiva_visibility(image) -> bool:
    """
    Returns True if the conjunctiva region is deemed visible.
    This is a complex ML task. For this validation, we use a basic color heuristic
    to check for reddish/pinkish tones typically present in the conjunctiva,
    assuming the eye region is cropped or prominently featured.
    """
    # Convert to HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    
    # Define range for reddish/pinkish colors (conjunctiva)
    lower_red1 = np.array([0, 40, 40])
    upper_red1 = np.array([10, 255, 255])
    
    lower_red2 = np.array([160, 40, 40])
    upper_red2 = np.array([180, 255, 255])
    
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    
    mask = mask1 + mask2
    
    # Check if there are enough reddish pixels
    red_pixel_count = cv2.countNonZero(mask)
    total_pixels = image.shape[0] * image.shape[1]
    
    # Ensure at least 0.1% of the image has conjunctiva-like colors
    return (red_pixel_count / total_pixels) > 0.001
