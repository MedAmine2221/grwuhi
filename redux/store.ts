"use client";
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './slice/quizSlice';
import loadingReducer from './slice/loadingSlice';
import quizResultReducer from './slice/quizResultSlice';
export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    quizResult : quizResultReducer,
    loading: loadingReducer,
  }
})
