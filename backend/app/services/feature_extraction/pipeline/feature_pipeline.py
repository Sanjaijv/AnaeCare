import time
import numpy as np
from app.schemas.features import FeatureVector, FeatureSummary, FeatureExtractionResponse
from app.services.feature_extraction.extractors.color.rgb import extract_rgb_features
from app.services.feature_extraction.extractors.color.hsv import extract_hsv_features
from app.services.feature_extraction.extractors.color.lab import extract_lab_features
from app.services.feature_extraction.extractors.clinical.redness import calculate_redness_index
from app.services.feature_extraction.extractors.clinical.paleness import calculate_paleness_index
from app.services.feature_extraction.extractors.clinical.brightness import calculate_brightness
from app.services.feature_extraction.extractors.texture.glcm import extract_glcm_features
from app.services.feature_extraction.extractors.texture.lbp import extract_lbp_features
from app.services.feature_extraction.extractors.statistics.statistics import extract_statistics
from app.services.feature_extraction.extractors.normalization.feature_normalizer import normalize_features
import cv2

class FeaturePipeline:
    @staticmethod
    def extract_all(image: np.ndarray) -> FeatureExtractionResponse:
        start_time = time.time()
        
        # 1. Color Features
        rgb_feat = extract_rgb_features(image)
        hsv_feat = extract_hsv_features(image)
        lab_feat = extract_lab_features(image)
        
        # 2. Clinical Features
        redness = calculate_redness_index(image)
        paleness = calculate_paleness_index(image)
        brightness = calculate_brightness(image)
        
        # 3. Texture Features
        glcm_feat = extract_glcm_features(image)
        lbp_feat = extract_lbp_features(image)
        texture_feat = glcm_feat + lbp_feat
        
        # 4. Statistical Features
        stat_feat = extract_statistics(image)
        
        # 5. Feature Vector assembly
        raw_vector = rgb_feat + hsv_feat + lab_feat + [redness, paleness, brightness] + texture_feat + stat_feat
        
        # 6. Normalization
        norm_method = "min-max"
        normalized_vector = normalize_features(raw_vector, method=norm_method)
        
        # Build Vector object
        feature_vector = FeatureVector(
            rgb=rgb_feat,
            hsv=hsv_feat,
            lab=lab_feat,
            redness=redness,
            paleness=paleness,
            brightness=brightness,
            texture=texture_feat,
            statistics=stat_feat,
            normalized_vector=normalized_vector
        )
        
        # Build Summary
        # Saturation from hsv_feat (Mean S is index 1)
        # Contrast from glcm_feat (Contrast is index 0)
        # Mean Intensity from stat_feat (Mean is index 0)
        summary = FeatureSummary(
            redness=redness,
            paleness=paleness,
            brightness=brightness,
            contrast=glcm_feat[0],
            saturation=hsv_feat[1] / 255.0, # Normalize to 0-1
            mean_intensity=stat_feat[0] / 255.0 # Normalize to 0-1
        )
        
        end_time = time.time()
        
        h, w = image.shape[:2]
        
        return FeatureExtractionResponse(
            success=True,
            featureCount=len(normalized_vector),
            processingTime=round(end_time - start_time, 3),
            featureVector=feature_vector,
            summary=summary,
            modelVersion="1.0.0",
            roiResolution=f"{w}x{h}",
            normalizationMethod=norm_method
        )
