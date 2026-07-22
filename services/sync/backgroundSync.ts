import { api } from '../api';
import { syncQueue } from './syncQueue';

let isSyncing = false;

export const backgroundSync = {
  trigger: async () => {
    if (isSyncing) return;
    
    isSyncing = true;
    try {
      const queue = await syncQueue.getQueue();
      if (queue.length === 0) {
        isSyncing = false;
        return;
      }
      
      // Batch up to 50 operations at once
      const batch = queue.slice(0, 50);
      
      const response = await api.post('/sync/batch', {
        operations: batch,
      });

      if (response.data?.success) {
        // Remove synced items
        const idsToRemove = batch.map(op => op.id);
        await syncQueue.removeFromQueue(idsToRemove);
        
        // If there are more items, trigger again
        const remainingQueue = await syncQueue.getQueue();
        if (remainingQueue.length > 0) {
          setTimeout(backgroundSync.trigger, 1000);
        }
      }
    } catch (error) {
      console.warn("Background sync failed, will retry later.", error);
    } finally {
      isSyncing = false;
    }
  }
};
