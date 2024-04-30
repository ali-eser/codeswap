import { createSlice } from "@reduxjs/toolkit";
import projectService from "../services/projectService";

const projectSlice = createSlice({
  name: "projects",
  initialState: { projects: [], loading: true },
  reducers: {
    setProjects (state, action) {
      state.projects = action.payload;
      state.loading = false;
    }
  }
});

export const { setProjects } = projectSlice.actions;

export const initializeProjects = () => {
  return async dispatch => {
    const projects = await projectService.getAll();
    dispatch(setProjects(projects));
  }
};

export const clearProjects = () => {
  return async dispatch => {
    dispatch(setProjects([]));
  }
};

export default projectSlice.reducer;