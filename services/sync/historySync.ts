import { syncQueue } from './syncQueue';

export const historySync = {
  queuePrediction: async (predictionData: any) => {
    await syncQueue.enqueue({
      type: 'HISTORY_UPDATE',
      payload: predictionData,
    });
  }
};
