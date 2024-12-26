import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../slices/authSlice';
import axios from 'axios';
import { setAllJobs } from '../slices/jobSlice';

function useGetAllJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAllJobs() {
            try {
              dispatch(setLoading(true));
              const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/job/get-jobs`,
                {
                  withCredentials: true,
                }
              );
              if (data?.success) {
                dispatch(setAllJobs(data?.jobs))
              }
            
            } catch (error) {
              console.log(error.response.data.message);
            } finally {
              dispatch(setLoading(false));
            }
          }
          getAllJobs();
    }, []);
}

export default useGetAllJobs