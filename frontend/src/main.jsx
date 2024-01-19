import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter as Router } from 'react-router-dom';
import App from "./App.jsx";

import userSlice from "./reducers/userReducer";
import notificationSlice from './reducers/notificationReducer.js';
import projectSlice from './reducers/projectReducer.js';

const store = configureStore({
  reducer: {
    user: userSlice,
    notification: notificationSlice,
    projects: projectSlice
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
