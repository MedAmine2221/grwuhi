import { RaitingState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: RaitingState = {
  raiting: [],
}

const raitingAppSlice = createSlice({
  name: 'raiting',
  initialState,
  reducers: {
    addRaiting: (state, action) => {
      state.raiting.push(action.payload)
    },
  },
})
// Export des actions
export const { addRaiting } = raitingAppSlice.actions
// Export du reducer
export default raitingAppSlice.reducer
