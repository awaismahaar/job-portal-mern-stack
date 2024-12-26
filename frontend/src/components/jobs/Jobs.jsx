import React, { useEffect, useState } from "react";
import FilteredCard from "./FilteredCard";
import Job from "./Job";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Jobs() {
  useGetAllJobs()
  const {allJobs,filterCart} = useSelector(store => store.jobs)  
  const [filteredCart, setFilteredCart] = useState(allJobs);
  const salaryRanges = [
    {label : "$40,000 - $50,000", min: 40000, max: 50000},
    {label : "$50,000 - $70,000", min: 50000, max: 70000},
    {label : "$70,000 - $90,000", min: 70000, max: 90000},
    {label : "$90,000+", min: 90000, max: Infinity},
  ]
  useEffect(() => {
    const filteredCarts = allJobs?.filter((job) => {
      if(!filterCart){
      return true
      }
      return job?.location === filterCart || 
      salaryRanges.find((r) => r.label === filterCart && job?.salary >= r.min && job?.salary <= r.max) 
      || job?.title === filterCart
    })
    setFilteredCart(filteredCarts)
  }, [filterCart,allJobs]);
  return (
    <div className="flex w-full">
      <div className="w-1/4">
        <FilteredCard />
      </div>
      <div className="w-3/4">
        {filteredCart.length === 0 ? (
          <h1>No Jobs Found</h1>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredCart.map((item, index) => (
              <motion.div
              initial={{ opacity: 0, x : 100 }}
              animate={{ opacity: 1, x : 0 }}
              transition={{ duration: 0.5 }}
               key={item._id}>
              <Job item={item}/>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
