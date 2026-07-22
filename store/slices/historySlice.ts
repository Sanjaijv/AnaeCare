import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { PredictionHistory, HistoryStatistics, TimelineEntry, HistoryResponse } from '../../types/history';
import { historyService } from '../../services/history';

export const fetchHistory = createAsyncThunk(
  'history/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await historyService.getHistory();
      if (!response.success) {
        return rejectWithValue(response.error || 'Failed to fetch history');
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'An error occurred');
    }
  }
);

interface HistoryState {
  predictions: PredictionHistory[];
  filteredPredictions: PredictionHistory[];
  statistics: HistoryStatistics | null;
  timeline: TimelineEntry[];
  selectedPrediction: PredictionHistory | null;
  searchQuery: string;
  selectedFilter: string;
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  predictions: [],
  filteredPredictions: [],
  statistics: null,
  timeline: [],
  selectedPrediction: null,
  searchQuery: '',
  selectedFilter: 'All',
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setSelectedPrediction(state, action: PayloadAction<PredictionHistory | null>) {
      state.selectedPrediction = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredPredictions = filterPredictions(state);
    },
    setSelectedFilter(state, action: PayloadAction<string>) {
      state.selectedFilter = action.payload;
      state.filteredPredictions = filterPredictions(state);
    },
    clearHistoryState(state) {
      state.predictions = [];
      state.filteredPredictions = [];
      state.statistics = null;
      state.timeline = [];
      state.selectedPrediction = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchHistory.fulfilled, (state, action: PayloadAction<HistoryResponse>) => {
      state.loading = false;
      state.predictions = action.payload.predictions;
      state.statistics = action.payload.statistics;
      state.timeline = action.payload.timeline;
      state.filteredPredictions = filterPredictions(state);
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  }
});

function filterPredictions(state: HistoryState): PredictionHistory[] {
  let result = state.predictions;
  
  if (state.selectedFilter !== 'All') {
    result = result.filter(p => p.riskLevel.toLowerCase() === state.selectedFilter.toLowerCase());
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    result = result.filter(p => {
      const d = new Date(p.timestamp);
      const dateStr = d.toLocaleDateString().toLowerCase();
      const monthStr = d.toLocaleString('default', { month: 'long' }).toLowerCase();
      const yearStr = d.getFullYear().toString();
      const riskStr = p.riskLevel.toLowerCase();
      
      return dateStr.includes(q) || monthStr.includes(q) || yearStr.includes(q) || riskStr.includes(q);
    });
  }

  return result;
}

export const { 
  setSelectedPrediction, 
  setSearchQuery, 
  setSelectedFilter, 
  clearHistoryState
} = historySlice.actions;

export default historySlice.reducer;
