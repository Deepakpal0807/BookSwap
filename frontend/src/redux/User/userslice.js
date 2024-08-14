import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: '',
    email: '',
    avatarUrl: '',
    city: '',
    state: '',
    pincode: '',
    joineddate:''
  },
  isLoggedIn: false,
};

export const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = {
        name: '',
        email: '',
        avatarUrl: '',
        city: '',
        state: '',
        pincode: '',
      };
      state.isLoggedIn = false;
    },
    // Optional: Additional actions like increment/decrement can be kept or removed
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userslice.actions;

export default userslice.reducer;
