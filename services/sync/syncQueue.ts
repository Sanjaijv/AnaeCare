import AsyncStorage from '@react-native-async-storage/async-storage';

const SYNC_QUEUE_KEY = 'anaecare_sync_queue';

export interface SyncOperation {
  id: string;
  type: 'PROFILE_UPDATE' | 'HISTORY_UPDATE' | 'SETTINGS_UPDATE';
  payload: any;
  timestamp: number;
}

export const syncQueue = {
  getQueue: async (): Promise<SyncOperation[]> => {
    const data = await AsyncStorage.getItem(SYNC_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  },

  enqueue: async (operation: Omit<SyncOperation, 'id' | 'timestamp'>) => {
    const queue = await syncQueue.getQueue();
    const newOperation: SyncOperation = {
      ...operation,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };
    queue.push(newOperation);
    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    
    // Optionally trigger background sync here or let a timer handle it
    // For now we just import backgroundSync dynamically to avoid circular dependencies
    const { backgroundSync } = require('./backgroundSync');
    backgroundSync.trigger();
  },

  removeFromQueue: async (idsToRemove: string[]) => {
    const queue = await syncQueue.getQueue();
    const newQueue = queue.filter(op => !idsToRemove.includes(op.id));
    await AsyncStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(newQueue));
  },

  clearQueue: async () => {
    await AsyncStorage.removeItem(SYNC_QUEUE_KEY);
  }
};
