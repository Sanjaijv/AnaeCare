import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { Text, useTheme, Card } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function ROIViewer() {
  const theme = useTheme();
  const { roiImage, landmarks } = useSelector((state: RootState) => state.conjunctiva);
  // Get original image uri from preprocessing slice (or image slice)
  const originalImageUri = useSelector((state: RootState) => state.preprocessing.processedImage || state.image.currentImage?.uri);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="titleLarge" style={[styles.title, { color: theme.colors.primary }]}>
        Detection Results
      </Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.label}>1. Original Image</Text>
          {originalImageUri ? (
             <Image source={{ uri: originalImageUri }} style={styles.imageLarge} resizeMode="contain" />
          ) : (
             <Text>No image available</Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.label}>2. Detected Landmarks</Text>
          <Text variant="bodySmall" style={{marginBottom: 10}}>Found {landmarks.length} key points.</Text>
          {/* Note: Drawing landmarks directly requires canvas or SVG. 
              For React Native simple view, we just show the count/data and the original image 
              unless we composite on the backend. The backend could return a composited image, 
              but we only return raw coordinates. We'll show the image again as a placeholder. */}
          {originalImageUri && (
             <Image source={{ uri: originalImageUri }} style={[styles.imageLarge, {opacity: 0.7}]} resizeMode="contain" />
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.label}>3. Extracted ROI (Conjunctiva)</Text>
          {roiImage ? (
             <Image source={{ uri: roiImage }} style={styles.imageSmall} resizeMode="contain" />
          ) : (
             <Text>No ROI available</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  imageLarge: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  imageSmall: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    backgroundColor: '#000',
  }
});
