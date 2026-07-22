import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

interface ProfileAvatarProps {
  uri?: string | null;
  onPress?: () => void;
  size?: number;
}

export const ProfileAvatar = ({ uri, onPress, size = 100 }: ProfileAvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.container}>
      {uri ? (
        <Image source={{ uri }} style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]}>
          <Ionicons name="person" size={size * 0.5} color={colors.textSecondary} />
        </View>
      )}
      {onPress && (
        <View style={styles.editBadge}>
          <Ionicons name="pencil" size={16} color={colors.surface} />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { alignSelf: 'center', marginVertical: 16, position: 'relative' },
  avatar: { backgroundColor: colors.surface },
  placeholder: { backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.primary },
  editBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, borderRadius: 16, padding: 6, borderWidth: 2, borderColor: colors.background }
});
