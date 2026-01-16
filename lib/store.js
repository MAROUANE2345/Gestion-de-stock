import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './reducer/dataSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});
