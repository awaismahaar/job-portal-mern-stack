import React, { useEffect } from 'react'
import Job from '../jobs/Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetJobsSearch from '../../hooks/useGetJobsSearch'
import { setSearchQuery } from '../../slices/jobSlice'
import { motion } from "framer-motion";
function Browse() {
  useGetJobsSearch();
  const dispatch = useDispatch();
  const {allJobs} = useSelector(store => store.jobs)
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""))
    };
  }, []);
  return (
    <div>
        <h1 className='text-3xl font-bold'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-4 mt-10'>
            {allJobs.length === 0 ? <h1 className="text-3xl">No jobs Avaliable</h1> : allJobs.map((job) => 
            <motion.div 
            initial={{ opacity: 0, x : 100 }}
            animate={{ opacity: 1, x : 0 }}
            transition={{ duration: 0.5 }}
            key={job._id}>
            <Job item={job}/>
            </motion.div>
            )}
        </div>
    </div>
  )
}

export default Browse