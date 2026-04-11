import { UserState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: UserState = {
  users: [],
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
    state.users?.push(action.payload)
    },
  },
})
// Export des actions
export const { addUser } = usersSlice.actions
// Export du reducer
export default usersSlice.reducer
