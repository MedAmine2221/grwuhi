"use client";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import quizReducer from './slice/quizSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer
  }
})
