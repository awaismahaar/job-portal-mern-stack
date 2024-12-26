import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    adminJobs: [],
    allAppliedJobs: [],
    searchQuery: "",
    filterCart: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setAdminJobs: (state, action) => {
      state.adminJobs = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterCart: (state, action) => {
      state.filterCart = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setAdminJobs,
  setAllAppliedJobs,
  setSearchQuery,
  setFilterCart,
} = jobSlice.actions;
export default jobSlice;
