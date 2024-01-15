import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App.jsx'

import userSlice from "./reducers/userReducer";
import notificationSlice from './reducers/notificationReducer.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
