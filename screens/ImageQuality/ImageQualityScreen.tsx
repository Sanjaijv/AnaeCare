import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootState } from '../../store/store';
import {
  startQualityCheck,
  qualityCheckSuccess,
  qualityCheckFailure,
} from '../../store/slices/qualitySlice';
import { QualityCard } from '../../components/quality/QualityCard';
import { QualityIndicator } from '../../components/quality/QualityIndicator';
import { QualityIssueCard } from '../../components/quality/QualityIssueCard';
import { LoadingAnalysis } from '../../components/quality/LoadingAnalysis';
import { MainStackParamList } from '../../types/navigation';
import { API_URL } from '../../constants/api'; // Assuming an env config exists or we use localhost

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'ImageQuality'>;

// Fallback to local machine IP for Android emulator testing, replace appropriately
const BACKEND_URL = 'http://10.0.2.2:8000/api/v1/quality/check'; 

export default function ImageQualityScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp>();
  const { imageUri, loading, score, status, checks, recommendation, error } = useSelector(
    (state: RootState) => state.quality
  );

  useEffect(() => {
    if (imageUri && status === 'Idle') {
      performQualityCheck(imageUri);
    }
  }, [imageUri, status]);

  const performQualityCheck = async (uri: string) => {
    dispatch(startQualityCheck());

    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        name: 'eye_image.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image quality');
      }

      const data = await response.json();
      dispatch(qualityCheckSuccess(data));
    } catch (err: any) {
      dispatch(qualityCheckFailure(err.message || 'An error occurred'));
    }
  };

  if (loading) {
    return <LoadingAnalysis />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Quality Assessment
      </Text>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      {error ? (
        <QualityIssueCard description={error} />
      ) : (
        <>
          {score !== null && status !== null && (
            <QualityCard score={score} status={status} />
          )}

          {recommendation && status === 'Reject' && (
            <QualityIssueCard description={recommendation} />
          )}

          {checks && (
            <View style={styles.checksContainer}>
              <Text variant="titleMedium" style={styles.checksTitle}>Analysis Details</Text>
              <QualityIndicator label="Resolution" passed={checks.resolution} />
              <QualityIndicator label="Blurriness" passed={checks.blur} />
              <QualityIndicator label="Brightness" passed={checks.brightness} />
              <QualityIndicator label="Contrast" passed={checks.contrast} />
              <QualityIndicator label="Eye Visibility" passed={checks.eyeVisible} />
              <QualityIndicator label="Conjunctiva Visibility" passed={checks.conjunctivaVisible} />
            </View>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Camera')}
          style={styles.button}
        >
          Retake
        </Button>
        <Button
          mode="contained"
          disabled={status === 'Reject' || loading || error !== null}
          onPress={() => navigation.navigate('ImagePreprocessing')}
          style={styles.button}
        >
          Continue
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  checksContainer: {
    marginVertical: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  checksTitle: {
    marginBottom: 8,
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    flex: 0.48,
  },
});
