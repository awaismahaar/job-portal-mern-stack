import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../slices/authSlice"
import jobSlice from "../slices/jobSlice"
import companySlice from "../slices/companySlice"
import applicantSlice from "../slices/applicantSlice"
const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        jobs : jobSlice.reducer,
        company : companySlice.reducer,
        applicant : applicantSlice.reducer
    }
})

export default store