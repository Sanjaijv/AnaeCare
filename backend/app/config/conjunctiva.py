# backend/app/config/conjunctiva.py

# Padding in pixels added to the extracted lower eyelid landmark boundary
ROI_PADDING = 10 

# Minimum allowable resolution for the extracted ROI (width, height)
MIN_ROI_SIZE = (128, 128)

# Minimum acceptable visibility percentage of the conjunctiva 
MIN_VISIBILITY = 0.80

# Maximum allowable occlusion percentage 
MAX_OCCLUSION = 0.20

# Minimum confidence threshold for facial landmark detection
CONFIDENCE_THRESHOLD = 0.5
