import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoading } from '../slices/authSlice';
import axios from 'axios';
import { setCompanies } from '../slices/companySlice';

function useGetAllCompanies() {
    const dispatch = useDispatch();
    useEffect(() => {
        async function getAllCompanies() {
            try {
              dispatch(setLoading(true));
              const { data } = await axios.get(
                `${import.meta.env.VITE_REACT_APP_URL}/company/get-companies`,
                {
                  withCredentials: true,
                }
              );
              if (data?.success) {
                dispatch(setCompanies(data?.company))
              }
           
            } catch (error) {
              console.log(error.response.data.message);
            } finally {
              dispatch(setLoading(false));
            }
          }
          getAllCompanies();
    }, []);
}

export default useGetAllCompanies