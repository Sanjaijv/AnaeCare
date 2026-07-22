import React, { useEffect, useCallback } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { AppHeader } from '../../components/layout/AppHeader';
import { ScreenWrapper } from '../../components/layout/ScreenWrapper';
import { BottomTabParamList, MainStackParamList } from '../../types/navigation';
import { spacing, colors, typography } from '../../theme';
import { AppDispatch, RootState } from '../../store/store';
import { fetchHistory, setSearchQuery, setSelectedFilter, setSelectedPrediction } from '../../store/slices/historySlice';

import { StatisticsCard } from '../../components/history/StatisticsCard';
import { TrendChart } from '../../components/history/TrendChart';
import { TimelineCard } from '../../components/history/TimelineCard';
import { FilterBar } from '../../components/history/FilterBar';
import { SearchBar } from '../../components/history/SearchBar';
import { HistoryCard } from '../../components/history/HistoryCard';
import { EmptyHistory } from '../../components/history/EmptyHistory';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'History'>,
  NativeStackScreenProps<MainStackParamList>
>;

export function HistoryScreen({ navigation }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    predictions, 
    filteredPredictions, 
    statistics, 
    timeline, 
    searchQuery, 
    selectedFilter, 
    loading 
  } = useSelector((state: RootState) => state.history);

  const loadData = useCallback(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleCardPress = (prediction: any) => {
    dispatch(setSelectedPrediction(prediction));
    navigation.navigate('PredictionDetails');
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <StatisticsCard statistics={statistics} />
      <FilterBar 
        selectedFilter={selectedFilter} 
        onSelectFilter={(filter) => dispatch(setSelectedFilter(filter))} 
      />
      <SearchBar 
        value={searchQuery} 
        onChangeText={(text) => dispatch(setSearchQuery(text))} 
      />
      <TrendChart entries={timeline} />
      <TimelineCard entries={timeline} />
    </View>
  );

  const renderEmpty = () => (
    loading ? null : <EmptyHistory />
  );

  return (
    <ScreenWrapper style={styles.wrapper}>
      <AppHeader title="Health History" subtitle="Monitor your progress over time" />
      <View style={styles.content}>
        {loading && predictions.length === 0 ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.xl }} />
        ) : (
          <FlatList
            data={filteredPredictions}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <HistoryCard 
                prediction={item} 
                index={index} 
                totalCount={filteredPredictions.length}
                onPress={() => handleCardPress(item)}
              />
            )}
            ListHeaderComponent={predictions.length > 0 ? renderHeader : null}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadData} colors={[colors.primary]} />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 0,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    marginBottom: spacing.md,
  },
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
  },
});
