import { LoadingState } from '@/constants/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: LoadingState = {
  loading: false,
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadingTrue: (state) => {
      state.loading = true
    },
    setLoadingFalse: (state) => {
      state.loading = false
    },
  },
})
// Export des actions
export const { setLoadingTrue, setLoadingFalse } = loadingSlice.actions
// Export du reducer
export default loadingSlice.reducer
