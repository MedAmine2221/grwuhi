"use client";
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slice/quizSlice';
import loadingReducer from './slice/loadingSlice';
import quizResultReducer from './slice/quizResultSlice';
import usersReducer from './slice/usersSlice';
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    quizResult : quizResultReducer,
    usersResult : usersReducer,
    loading: loadingReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;