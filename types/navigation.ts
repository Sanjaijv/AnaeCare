export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  Camera: undefined;
  ImagePreview: { imageId: string };
  ImageQuality: undefined;
  ImagePreprocessing: undefined;
  ConjunctivaDetection: undefined;
  FeatureExtraction: undefined;
  FeatureReview: undefined;
  Prediction: undefined;
  PredictionResult: undefined;
  PredictionDetails: undefined;
  EditProfile: undefined;
  HealthProfile: undefined;
  Settings: undefined;
  Healthcare: undefined;
  HospitalDetails: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  History: undefined;
  Diet: undefined;
  Profile: undefined;
};
