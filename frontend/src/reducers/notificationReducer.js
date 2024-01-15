import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification (state, action) {
      return action.payload
    }
  }
});

export const { setNotification } = notificationSlice.actions;

export const defineNotification = (text, time) => {
  return dispatch => {
    dispatch(setNotification(text));
    setTimeout(() => dispatch(setNotification("")), time * 1000);
  };
};

export default notificationSlice.reducer;