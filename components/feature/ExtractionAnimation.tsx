import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

interface ExtractionAnimationProps {
  status: 'idle' | 'extracting' | 'succeeded' | 'failed';
}

const steps = [
  'Analyzing Colors...',
  'Extracting Clinical Features...',
  'Analyzing Texture & Statistics...',
  'Normalizing Feature Vector...'
];

export const ExtractionAnimation: React.FC<ExtractionAnimationProps> = ({ status }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (status === 'extracting') {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(interval);
    } else if (status === 'succeeded') {
      setCurrentStep(steps.length - 1);
    } else {
      setCurrentStep(0);
    }
  }, [status]);

  if (status === 'idle') return null;

  return (
    <View style={styles.container}>
      {status === 'extracting' && (
        <Text style={styles.text}>{steps[currentStep]}</Text>
      )}
      {status === 'succeeded' && (
        <Text style={styles.successText}>Extraction Complete!</Text>
      )}
      {status === 'failed' && (
        <Text style={styles.errorText}>Extraction Failed.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: typography.fontFamily,
  },
  successText: {
    fontSize: 16,
    color: colors.success,
    fontFamily: typography.fontFamily,
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
    fontFamily: typography.fontFamily,
  }
});
