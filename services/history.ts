import { api } from './api';
import { HistoryResponse, PredictionHistory } from '../types/history';

export const historyService = {
  getHistory: async (): Promise<HistoryResponse> => {
    const response = await api.get('/v1/history');
    return response.data;
  },

  getPrediction: async (id: string): Promise<PredictionHistory> => {
    const response = await api.get(`/v1/history/${id}`);
    return response.data;
  },

  savePrediction: async (data: any): Promise<PredictionHistory> => {
    const response = await api.post('/v1/history', data);
    return response.data;
  }
};
