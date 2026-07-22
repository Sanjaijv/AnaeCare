import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../types/navigation';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearCurrentImage } from '../../store/slices/imageSlice';
import { ImagePreview } from '../../components/camera/ImagePreview';
import { PreviewToolbar } from '../../components/camera/PreviewToolbar';

type ImagePreviewRouteProp = RouteProp<MainStackParamList, 'ImagePreview'>;
type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'ImagePreview'>;

export default function ImagePreviewScreen() {
  const route = useRoute<ImagePreviewRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const currentImage = useAppSelector(state => state.image.currentImage);
  const dispatch = useAppDispatch();

  if (!currentImage || currentImage.id !== route.params.imageId) {
    return (
      <View style={styles.errorContainer}>
        <Text>Image not found</Text>
      </View>
    );
  }

  const handleRetake = () => {
    dispatch(clearCurrentImage());
    navigation.goBack();
  };

  const handleContinue = () => {
    navigation.navigate('ImageQuality');
  };

  return (
    <View style={styles.container}>
      <ImagePreview imageMetadata={currentImage} />
      <PreviewToolbar onRetake={handleRetake} onContinue={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
