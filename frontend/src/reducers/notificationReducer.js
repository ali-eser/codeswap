import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification (state, action) {
      return action.payload
    }
  }
});

export const { setNotification } = notificationSlice.actions;

export const defineNotification = (object, time) => {
  return dispatch => {
    dispatch(setNotification(object));
    setTimeout(() => dispatch(setNotification(null)), time * 1000);
  };
};

export default notificationSlice.reducer;