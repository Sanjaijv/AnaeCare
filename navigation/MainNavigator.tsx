import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from '../types/navigation';
import { TabNavigator } from './TabNavigator';
import CameraScreen from '../screens/Camera/CameraScreen';
import ImagePreviewScreen from '../screens/Camera/ImagePreviewScreen';
import ImageQualityScreen from '../screens/ImageQuality/ImageQualityScreen';
import { PlaceholderScreen } from '../screens/Placeholder/PlaceholderScreen';
import PreprocessingScreen from '../screens/Preprocessing/PreprocessingScreen';
import ConjunctivaDetectionScreen from '../screens/ConjunctivaDetection/ConjunctivaDetectionScreen';
import FeatureExtractionScreen from '../screens/FeatureExtraction/FeatureExtractionScreen';
import FeatureReviewScreen from '../screens/FeatureReview/FeatureReviewScreen';
import PredictionProcessingScreen from '../screens/Prediction/PredictionProcessingScreen';
import PredictionResultScreen from '../screens/PredictionResult/PredictionResultScreen';
import PredictionDetailsScreen from '../screens/History/PredictionDetailsScreen';
import { EditProfileScreen } from '../screens/Profile/EditProfileScreen';
import { HealthProfileScreen } from '../screens/Profile/HealthProfileScreen';
import { SettingsScreen } from '../screens/Profile/SettingsScreen';
import HealthcareScreen from '../screens/Healthcare/HealthcareScreen';
import HospitalDetailsScreen from '../screens/Healthcare/HospitalDetailsScreen';

const Stack = createNativeStackNavigator<MainStackParamList>();

export function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Camera" component={CameraScreen} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
      <Stack.Screen name="ImageQuality" component={ImageQualityScreen} />
      
      {/* Placeholders for future phases */}
      <Stack.Screen name="ImagePreprocessing" component={PreprocessingScreen} />
      <Stack.Screen name="ConjunctivaDetection" component={ConjunctivaDetectionScreen} />
      <Stack.Screen name="FeatureExtraction" component={FeatureExtractionScreen} />
      <Stack.Screen name="FeatureReview" component={FeatureReviewScreen} />
      <Stack.Screen name="Prediction" component={PredictionProcessingScreen} />
      <Stack.Screen name="PredictionResult" component={PredictionResultScreen} />
      <Stack.Screen name="PredictionDetails" component={PredictionDetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="HealthProfile" component={HealthProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Healthcare" component={HealthcareScreen} />
      <Stack.Screen name="HospitalDetails" component={HospitalDetailsScreen} />
    </Stack.Navigator>
  );
}
