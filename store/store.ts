import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import predictionReducer from './slices/predictionSlice';
import historyReducer from './slices/historySlice';
import imageReducer from './slices/imageSlice';
import qualityReducer from './slices/qualitySlice';
import preprocessingReducer from './slices/preprocessingSlice';
import conjunctivaReducer from './slices/conjunctivaSlice';
import featuresReducer from './slices/featuresSlice';
import dietReducer from './slices/dietSlice';
import profileReducer from './slices/profileSlice';
import healthcareReducer from './slices/healthcareSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    prediction: predictionReducer,
    history: historyReducer,
    image: imageReducer,
    quality: qualityReducer,
    preprocessing: preprocessingReducer,
    conjunctiva: conjunctivaReducer,
    features: featuresReducer,
    diet: dietReducer,
    profile: profileReducer,
    healthcare: healthcareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
