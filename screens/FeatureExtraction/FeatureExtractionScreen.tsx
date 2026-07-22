import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startExtraction, extractionSuccess, extractionFailure } from '../../store/slices/featuresSlice';
import { ExtractionAnimation } from '../../components/feature/ExtractionAnimation';
import { FeatureProgress } from '../../components/feature/FeatureProgress';
import { Header } from '../../components/common/Header';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import axios from 'axios';
import { API_URL } from '../../constants/api'; // assuming there is a config, if not will use localhost
import * as FileSystem from 'expo-file-system';

type Props = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'FeatureExtraction'>;
};

export default function FeatureExtractionScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.features);
  
  // We assume the segmented conjunctiva ROI image URI is stored in conjunctiva slice
  // For this implementation, let's assume it's in the Redux store
  const { roiImageUri } = useAppSelector((state: any) => state.conjunctiva || { roiImageUri: null });

  useEffect(() => {
    extractFeatures();
  }, []);

  const extractFeatures = async () => {
    if (!roiImageUri) {
      dispatch(extractionFailure("No ROI image found. Please go back and segment conjunctiva."));
      return;
    }

    dispatch(startExtraction());

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: roiImageUri,
        name: 'roi.jpg',
        type: 'image/jpeg',
      } as any);

      // We fallback to a generic localhost URL if API_URL isn't set
      const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8000/api/v1';
      
      const response = await axios.post(`${baseURL}/features/extract`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 10000,
      });

      if (response.data && response.data.success) {
        dispatch(extractionSuccess({
          featureVector: response.data.featureVector,
          summary: response.data.summary,
          featureCount: response.data.featureCount,
          processingTime: response.data.processingTime,
        }));
        
        // Wait a moment for animation to show success, then navigate
        setTimeout(() => {
          navigation.replace('FeatureReview');
        }, 1500);
      } else {
        throw new Error("Failed to extract features.");
      }
    } catch (err: any) {
      console.error("Feature extraction error:", err);
      dispatch(extractionFailure(err.message || "Failed to extract features."));
      Alert.alert("Error", "Feature extraction failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Extracting Features" onBack={() => navigation.goBack()} />
      <View style={styles.content}>
        <FeatureProgress status={status} />
        <ExtractionAnimation status={status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});
