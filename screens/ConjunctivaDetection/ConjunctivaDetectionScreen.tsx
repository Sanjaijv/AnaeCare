import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { detectConjunctiva, resetConjunctiva } from '../../store/slices/conjunctivaSlice';
import { DetectionAnimation } from '../../components/conjunctiva/DetectionAnimation';
import { ROIViewer } from '../../components/conjunctiva/ROIViewer';
import { DetectionStatus } from '../../components/conjunctiva/DetectionStatus';

type Props = NativeStackScreenProps<MainStackParamList, 'ConjunctivaDetection'>;

export default function ConjunctivaDetectionScreen({ navigation }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  
  const { loading, status, error, validation } = useSelector((state: RootState) => state.conjunctiva);
  // Source image from preprocessing output or directly from camera capture
  const originalImageUri = useSelector((state: RootState) => state.preprocessing.processedImage || state.image.currentImage?.uri);

  useEffect(() => {
    if (!originalImageUri) {
      Alert.alert('Error', 'No image found for conjunctiva detection.');
      navigation.goBack();
      return;
    }

    // Start conjunctiva detection immediately on mount
    dispatch(detectConjunctiva(originalImageUri));
  }, [dispatch, originalImageUri, navigation]);

  const handleContinue = () => {
    // Medical software precaution: Require explicit continue tap
    if (validation?.valid) {
       navigation.navigate('FeatureExtraction');
    } else {
       Alert.alert('Invalid ROI', 'The extracted region is not valid for feature extraction. Please try taking another photo.');
    }
  };

  const handleRetry = () => {
    dispatch(resetConjunctiva());
    navigation.navigate('Camera'); // Go back to camera to retake
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        
        {loading && <DetectionAnimation />}
        
        {!loading && status !== 'idle' && (
          <View style={{ flex: 1, width: '100%' }}>
            <ROIViewer />
            <DetectionStatus />
          </View>
        )}

      </View>
      
      {/* Footer Controls */}
      <View style={styles.footer}>
        {!loading && status === 'completed' && validation?.valid && (
          <Button 
            mode="contained" 
            onPress={handleContinue}
            style={styles.button}
          >
            Continue
          </Button>
        )}
        
        {!loading && (
           <Button 
             mode={status === 'completed' && validation?.valid ? "outlined" : "contained"} 
             onPress={handleRetry}
             style={styles.button}
           >
             Retake Photo
           </Button>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    padding: 20,
    gap: 12,
  },
  button: {
    width: '100%',
  }
});
