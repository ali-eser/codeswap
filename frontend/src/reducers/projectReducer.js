import { createSlice } from "@reduxjs/toolkit";
import projectService from "../services/projectService";

const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    setProjects (state, action) {
      return action.payload
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

export default projectSlice.reducer;