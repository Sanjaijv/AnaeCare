import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Button, useTheme, ProgressBar } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { processImage, updateStatus, resetPreprocessing } from '../../store/slices/preprocessingSlice';
import { ProcessingAnimation } from '../../components/preprocessing/ProcessingAnimation';
import { ProcessingStatus } from '../../components/preprocessing/ProcessingStatus';

type Props = NativeStackScreenProps<MainStackParamList, 'ImagePreprocessing'>;

const PROCESSING_STEPS = [
  'Preparing Image...',
  'Removing Noise...',
  'Enhancing Contrast...',
  'Normalizing Colors...',
  'Finalizing...'
];

export default function PreprocessingScreen({ navigation }: Props) {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [progress, setProgress] = useState(0);
  
  const { loading, status, processedImage, error } = useSelector((state: RootState) => state.preprocessing);
  // Retrieve the selected image URI from the global image slice or pass it via params.
  // Assuming it's in the image slice from Phase 5/6:
  const imageUri = useSelector((state: RootState) => state.image.currentImage?.uri);

  useEffect(() => {
    if (!imageUri) {
      Alert.alert('Error', 'No image found for preprocessing.');
      navigation.goBack();
      return;
    }

    // Start preprocessing process
    dispatch(processImage(imageUri));
  }, [dispatch, imageUri, navigation]);

  useEffect(() => {
    // Simulate frontend status updates for better UX during backend processing
    let stepIndex = 0;
    let progressInterval: ReturnType<typeof setTimeout>;

    if (loading) {
      progressInterval = setInterval(() => {
        if (stepIndex < PROCESSING_STEPS.length) {
          dispatch(updateStatus(PROCESSING_STEPS[stepIndex]));
          setProgress((stepIndex + 1) / PROCESSING_STEPS.length);
          stepIndex++;
        }
      }, 800); // Update step roughly every 800ms
    }

    return () => clearInterval(progressInterval);
  }, [loading, dispatch]);

  useEffect(() => {
    if (status === 'completed' && processedImage) {
      // Small delay before navigating for smooth transition
      setTimeout(() => {
        navigation.navigate('ConjunctivaDetection');
      }, 1000);
    } else if (status === 'failed' && error) {
      Alert.alert('Processing Failed', error, [
        { text: 'Try Again', onPress: () => dispatch(processImage(imageUri!)) },
        { text: 'Cancel', onPress: () => {
            dispatch(resetPreprocessing());
            navigation.goBack();
          } 
        }
      ]);
    }
  }, [status, processedImage, error, navigation, dispatch, imageUri]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <ProcessingAnimation />
        
        <ProcessingStatus status={loading ? status : (status === 'completed' ? 'Completed!' : 'Failed')} />
        
        {loading && (
          <View style={styles.progressContainer}>
            <ProgressBar progress={progress} color={theme.colors.primary} style={styles.progressBar} />
          </View>
        )}
      </View>
      
      {/* Footer / Cancel Button */}
      {!loading && status !== 'completed' && (
        <View style={styles.footer}>
          <Button 
            mode="outlined" 
            onPress={() => {
              dispatch(resetPreprocessing());
              navigation.goBack();
            }}
          >
            Cancel
          </Button>
        </View>
      )}
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
    padding: 20,
  },
  progressContainer: {
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
});
