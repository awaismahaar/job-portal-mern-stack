import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../slices/authSlice';
import axios from 'axios';
import { setAllAppliedJobs } from '../slices/jobSlice';

function useGetAppliedJobs() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAppliedJobs() {
            try {
              dispatch(setLoading(true));
              const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/application/get-apply-jobs`,
                {
                  withCredentials: true,
                }
              );
              if (data?.success) {
                dispatch(setAllAppliedJobs(data?.applications))
              }
              console.log(data);
            } catch (error) {
              console.log(error.response.data.message);
            } finally {
              dispatch(setLoading(false));
            }
          }
          getAppliedJobs();
    }, []);
}

export default useGetAppliedJobs