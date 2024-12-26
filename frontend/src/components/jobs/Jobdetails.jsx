import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const Jobdetails = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const [job, setJob] = useState({});
  const { id } = useParams();
  const isAppliedInitially =
  job?.applications?.some(
      (application) => application?.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isAppliedInitially);
  useEffect(() => {
    async function getSingleJob() {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/job/get-job/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data?.success) {
          setJob(data?.job);
          setIsApplied(data?.job?.applications?.some(applications => applications.applicant === user?._id ));
          
        }
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        dispatch(setLoading(false));
      }
    }
    getSingleJob();
  }, [id, dispatch, user?._id]);
  
  async function applyForJob() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/application/apply-job/${
          job._id
        }`,
        {
          withCredentials: true,
        }
      );
      if (data?.success) {
        alert(data?.message);
        setIsApplied(false);
        const updateJob = {...job, applications : [...job.applications , {applicant : user._id}]}
        setJob(updateJob);
      }
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      setIsApplied(false);
    }
  }
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Job Title and Company */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Senior Software Engineer
          </h1>
          <p className="text-xl text-gray-600">Tech Innovations Inc.</p>
        </div>
        <div>
          <span className="bg-green-500 text-white py-1 px-3 rounded-full text-sm">
            Full-time
          </span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 text-lg">
          Location: <span className="font-semibold">San Francisco, CA</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-lg">
          Salary: <span className="font-semibold">70LPA</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-lg">
          Experence: <span className="font-semibold">1 Year</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-lg">
          Total Applicants: <span className="font-semibold">5</span>
        </p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700 text-lg">
          Post Date: <span className="font-semibold">5/5/2027</span>
        </p>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Job Description
        </h2>
        <p className="text-gray-700 mt-2">
          We are looking for an experienced Senior Software Engineer to join our
          development team. You will be responsible for building scalable,
          high-performance software solutions, collaborating with
          cross-functional teams, and implementing cutting-edge technologies in
          our projects.
        </p>
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Responsibilities
        </h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>
            Design and develop software solutions based on project requirements.
          </li>
          <li>Write clean, efficient, and maintainable code.</li>
          <li>
            Collaborate with designers, product managers, and other engineers.
          </li>
          <li>
            Participate in code reviews and provide constructive feedback.
          </li>
          <li>Continuously improve development processes and practices.</li>
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Requirements</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>5+ years of experience in software development.</li>
          <li>
            Strong proficiency in JavaScript, React, Node.js, and related
            frameworks.
          </li>
          <li>
            Experience with RESTful APIs, cloud platforms, and microservices
            architecture.
          </li>
          <li>Ability to work in an agile development environment.</li>
          <li>Excellent communication and collaboration skills.</li>
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Benefits</h2>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Competitive salary and performance-based bonuses.</li>
          <li>Health, dental, and vision insurance.</li>
          <li>Generous paid time off and holiday benefits.</li>
          <li>Professional development and training opportunities.</li>
          <li>Flexible working hours and remote work options.</li>
        </ul>
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <button
          onClick={!isApplied ? applyForJob : null}
          disabled={isApplied}
          className={`${
            isApplied
              ? "bg-gray-300 hover:cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white py-3 px-6 rounded-lg transition-colors`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default Jobdetails;
