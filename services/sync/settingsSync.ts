import { syncQueue } from './syncQueue';

export const settingsSync = {
  queueUpdate: async (settings: any) => {
    await syncQueue.enqueue({
      type: 'SETTINGS_UPDATE',
      payload: settings,
    });
  }
};
