import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterCart } from "../../slices/jobSlice";

const jobData = [
  {
    filteredType: "Location",
    locations: [
      "New York, USA",
      "London, UK",
      "Boston",
      "Seattle",
      "Los Angeles",
      "San Francisco",
      "Los Angeles",
    ],
  },
  {
    filteredType: "Salary",
    salaries: [
      "$40,000 - $50,000",
      "$50,000 - $70,000",
      "$70,000 - $90,000",
      "$90,000+",
    ],
  },
  {
    filteredType: "Industry",
    industries: [
      "Web Developer",
      "Project Manager",
      "Data Analyst",
      "Finance",
      "Creative",
    ],
  },
];

const FilteredCard = () => {
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setFilterCart(selected))
  },[selected,dispatch])
  
  return (
    <div className="h-[80vh] overflow-y-scroll w-3/4 m-auto border p-5">
      <h1 className="text-2xl font-bold mb-2">Job Filters</h1>
      {jobData.map((filter, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3 className="text-lg">{filter.filteredType}</h3>
          {Object.values(filter)[1].map((item, idx) => (
            <div key={idx} className="flex gap-2">
            <input
                type="radio"
                name={filter.filteredType} // Ensures one selection per filter type
                value={item}
                onChange={(e) => setSelected(e.target.value)}
                className="cursor-pointer pr-2"
              />
            <label style={{ display: "block", margin: "5px 0" }}>
              {item}
            </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilteredCard;
