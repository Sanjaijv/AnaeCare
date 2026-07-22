import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { ImageMetadata } from '../../types/camera';

interface ImagePreviewProps {
  imageMetadata: ImageMetadata;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageMetadata }) => {
  const getFileType = (uri: string) => {
    const parts = uri.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'UNKNOWN';
  };

  const sizeMb = (imageMetadata.size / (1024 * 1024)).toFixed(2);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageMetadata.uri }} style={styles.image} resizeMode="contain" />
      <View style={styles.metadataContainer}>
        <Text style={styles.text} variant="titleSmall">Debug Metadata</Text>
        <Text style={styles.text} variant="bodySmall">Size: {sizeMb} MB</Text>
        <Text style={styles.text} variant="bodySmall">Resolution: {imageMetadata.width} x {imageMetadata.height}</Text>
        <Text style={styles.text} variant="bodySmall">Type: {getFileType(imageMetadata.uri)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  metadataContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: 'white',
  }
});
