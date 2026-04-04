"use client";
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import quizReducer from './slice/quizSlice';
import loadingReducer from './slice/loadingSlice';
import resultQuizResponsAnalyseReducer from './slice/resultQuizResponsAnalyseSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
    resultQuizResponsAnalyse : resultQuizResponsAnalyseReducer,
    loading: loadingReducer,
  }
})
