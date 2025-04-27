import { createSlice } from "@reduxjs/toolkit";

// initialState gonna check localStorage
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth", // 📌 Name of the slice in your Redux store state. (state.auth)
  initialState, // 📌 The initial state for this slice.
  reducers: {
    setCredentials: (state, action) => {
      /// 📌 Save user data (like token, name, email etc.) into Redux state
      state.userInfo = action.payload;

      // 📌 Also store the same data into localStorage so it's persistent on refresh.
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      // 📌 When user logs out — remove userInfo from Redux state
      state.userInfo = null;

      // 📌 Also clear user info from localStorage
      localStorage.removeItem("userInfo");
    },
  },
});

// When we call  setCredentials its action
// when it changes our state thats reducer

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
