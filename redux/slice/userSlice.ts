import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: null
}

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
