import { UserState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.user = action.payload
    },
  },
})
// Export des actions
export const { addInfo } = userSlice.actions
// Export du reducer
export default userSlice.reducer
