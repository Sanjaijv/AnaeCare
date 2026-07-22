import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors';

const tabRoutes = [
  { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
  { key: 'History', title: 'History', focusedIcon: 'history', unfocusedIcon: 'history' },
  { key: 'Diet', title: 'Diet', focusedIcon: 'food-apple', unfocusedIcon: 'food-apple-outline' },
  { key: 'Profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
];

export function BottomTabBar({ navigation, state }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = tabRoutes.find((item) => item.key === route.name);
        const iconName = isFocused ? tab?.focusedIcon : tab?.unfocusedIcon;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            style={styles.tabButton}
            onPress={() => navigation.navigate(route.name)}
          >
            <IconButton icon={iconName ?? 'circle'} size={20} iconColor={isFocused ? colors.primary : colors.muted} />
            <Text style={[styles.label, isFocused ? styles.activeLabel : styles.inactiveLabel]}>{route.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  label: {
    fontSize: 11,
    marginTop: -4,
  },
  activeLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  inactiveLabel: {
    color: colors.muted,
  },
});
