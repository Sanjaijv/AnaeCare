def check_resolution(image, min_width: int = 720, min_height: int = 720) -> bool:
    """
    Returns True if the image meets the minimum resolution requirements.
    """
    height, width = image.shape[:2]
    return width >= min_width and height >= min_height
