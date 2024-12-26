import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "auth",
    initialState : {
        loading : false,
        user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    },
    reducers : {
        setLoading : (state, action) => {
            state.loading = action.payload
        },
        setUser : (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setLoading , setUser } = authSlice.actions
export default authSlice;