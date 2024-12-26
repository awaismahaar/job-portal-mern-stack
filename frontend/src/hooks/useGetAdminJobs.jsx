import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../slices/authSlice';
import { setAdminJobs } from '../slices/jobSlice';

function useGetAdminJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAdminjobs() {
            try {
              dispatch(setLoading(true));
              const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/job/get-all-jobs`,
                {
                  withCredentials: true,
                }
              );
              if (data?.success) {
                dispatch(setAdminJobs(data?.jobs))
              }
             
            } catch (error) {
              console.log(error.response.data.message);
            } finally {
              dispatch(setLoading(false));
            }
          }
          getAdminjobs();
    }, []);
}

export default useGetAdminJobs