import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Subtitle } from '../common/Typography';
import { spacing } from '../../theme/spacing';
import { colors } from '../../theme/colors';

interface WelcomeCardProps {
  name: string;
  greetingSubtitle: string;
}

export const WelcomeCard: React.FC<WelcomeCardProps> = React.memo(({ name, greetingSubtitle }) => {
  return (
    <View style={styles.container}>
      <Title style={styles.greeting}>Good Morning,</Title>
      <Title style={styles.name}>{name}</Title>
      <Subtitle style={styles.subtitle}>{greetingSubtitle}</Subtitle>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    backgroundColor: colors.surface,
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: 24,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.md,
  },
  subtitle: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  }
});
