import React, { useState, useEffect } from "react";
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading } from "../../slices/authSlice";
import { toast } from "sonner";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const CreateJob = () => {
  const {id} = useParams()
  useGetAllCompanies()
  const {companies} = useSelector(store => store.company)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
 
  
  const [formData, setFormData] = useState({
    title:location.state?.title || "",
    description: location.state?.description || "",
    requirements: location.state?.requirements || [],
    location: location.state?.location || "",
    salary: location.state?.salary || "",
    experience: location.state?.experience || "",
    jobType: location.state?.jobType || "",
    position: location.state?.position || "",
    companyId: location.state?.companyId || "",
  });

  useEffect(() => {
    setFormData({
      title:location.state?.title || "",
      description: location.state?.description || "",
      requirements: location.state?.requirements || [],
      location: location.state?.location || "",
      salary: location.state?.salary || "",
      experience: location.state?.experience || "",
      jobType: location.state?.jobType || "",
      position: location.state?.position || "",
      companyId: location.state?.companyId || "",
    })
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequirementsChange = (e, index) => {
    const updatedRequirements = [...formData.requirements];
    updatedRequirements[index] = e.target.value;
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  const addRequirement = () => {
    setFormData({ ...formData, requirements: [...formData.requirements, ""] });
  };

  const removeRequirement = (index) => {
    const updatedRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({ ...formData, requirements: updatedRequirements });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      if(location.state){
        const { data } = await axios.put(
          `${import.meta.env.VITE_REACT_APP_URL}/job/update-job/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        ); 
        if (data?.success) {
          navigate("/admin/jobs")
          toast.success(data?.message);
        }
      }
      else{
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_URL}/job/create-job`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (data?.success) {
          navigate("/admin/jobs")
          toast.success(data?.message);
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Create Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block outline-none text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Requirements</label>
          {formData.requirements.map((req, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input
                type="text"
                value={req}
                onChange={(e) => handleRequirementsChange(e, index)}
                className="flex-grow rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeRequirement(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirement}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Requirement
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <input
            type="text"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company</label>
          <select
            name="companyId"
            value={formData.companyId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Select a company</option>
            {companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
