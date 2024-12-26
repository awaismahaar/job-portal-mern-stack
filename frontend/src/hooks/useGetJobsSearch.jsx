import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../slices/authSlice';
import { setAllJobs } from '../slices/jobSlice';

function useGetJobsSearch() {
    const dispatch = useDispatch();
    const {searchQuery} = useSelector(store => store.jobs)
    useEffect(() => {
        async function getSearchjobs() {
            try {
              dispatch(setLoading(true));
              const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/job/search-jobs?keyword=${searchQuery}`,
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
          getSearchjobs();
    }, []);
}

export default useGetJobsSearch