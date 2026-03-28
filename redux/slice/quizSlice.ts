import { QuizState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: QuizState = {
  quiz: null,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quiz = action.payload
    },
  },
})
// Export des actions
export const { addQuiz } = quizSlice.actions
// Export du reducer
export default quizSlice.reducer
