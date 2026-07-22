import { syncQueue } from './syncQueue';
import { User } from '../../types/user';

export const profileSync = {
  queueUpdate: async (profile: Partial<User>) => {
    await syncQueue.enqueue({
      type: 'PROFILE_UPDATE',
      payload: profile,
    });
  }
};
