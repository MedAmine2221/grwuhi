import { QuizResultState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: QuizResultState = {
  quizResult: null,
}

const quizResultSlice = createSlice({
  name: 'quizResult',
  initialState,
  reducers: {
    addQuizResult: (state, action) => {
      state.quizResult = action.payload
    },
  },
})
// Export des actions
export const { addQuizResult } = quizResultSlice.actions
// Export du reducer
export default quizResultSlice.reducer
