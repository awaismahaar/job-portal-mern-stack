import React from "react";
import LatestJobsCard from "./LatestJobsCard";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
function LatestJobs() {
  useGetAllJobs()
  const {allJobs} = useSelector(store => store.jobs)
  return (
    <div className="py-32">
      <div>
        <h1 className="text-6xl font-bold">
          Latest and <span className="text-red-500">Top Levels</span>
          <br /> Jobs <span className="text-red-500">Opening</span>
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-10">
            {allJobs.length === 0 ? <h1 className="text-3xl">No jobs Avaliable</h1> : allJobs.slice(0,6).map((job,index) => 
            <LatestJobsCard key={job._id} job={job}/>
            )}
        </div>
      </div>
    </div>
  );
}

export default LatestJobs;
