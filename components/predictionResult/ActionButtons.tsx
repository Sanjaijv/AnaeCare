import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppButton } from '../../components/buttons/AppButton';

interface ActionButtonsProps {
  onScanAgain: () => void;
  onViewDiet: () => void;
  onViewHistory: () => void;
  onViewHealthcare: () => void;
  risk?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onScanAgain,
  onViewDiet,
  onViewHistory,
  onViewHealthcare,
  risk = 'Low'
}) => {
  const getHealthcareLabel = () => {
    const r = risk.toLowerCase();
    if (r === 'high') return 'Find Nearby Hospital';
    if (r === 'moderate') return 'Consult Doctor';
    return 'Healthy Habits';
  };
  return (
    <View style={styles.container}>
      <AppButton
        label="Scan Again"
        mode="contained"
        onPress={onScanAgain}
        style={styles.primaryButton}
      />
      <AppButton
        label="View Diet Plan"
        mode="outlined"
        onPress={onViewDiet}
        style={styles.secondaryButton}
      />
      <AppButton
        label="View History"
        mode="text"
        onPress={onViewHistory}
        style={styles.secondaryButton}
      />

      {/* Future Features */}
      <AppButton
        label="Share Report (Coming Soon)"
        mode="outlined"
        onPress={() => {}}
        style={[styles.secondaryButton, styles.disabledButton]}
      />
      <AppButton
        label="Download PDF (Coming Soon)"
        mode="outlined"
        onPress={() => {}}
        style={[styles.secondaryButton, styles.disabledButton]}
      />
      <AppButton
        label={getHealthcareLabel()}
        mode="outlined"
        onPress={onViewHealthcare}
        style={styles.secondaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingBottom: 32,
  },
  primaryButton: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  secondaryButton: {
    marginBottom: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
