import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setLoading } from "../../slices/authSlice";

function CompanySetup() {
  const { loading } = useSelector((store) => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    
    
    const {id} = useParams()
  const [file, setFile] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [companyData, setCompanyData] = useState({
    name: location.state?.name || "",
    description: location.state?.description || "",
    location: location.state?.location || "",
    website: location.state?.website || "",
  });
  useEffect(() => {
    setCompanyData({
      name: location.state?.name || "",
      description: location.state?.description || "",
      location: location.state?.location || "",
      website: location.state?.website || "",
    })
  }, [location.state]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };
  async function getCompanyName() {
    try {    
      const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/company/get-company/${id}`,
       {
        withCredentials: true,
       }
      );
      if (data?.success) {
        
        
        setCompanyName(data?.company)
      }
         
      } catch (error) {
         console.log(error.response.data.message);
      }
      
  }
  useEffect(() => {
    getCompanyName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        dispatch(setLoading(true));
        const formData = new FormData();
        formData.append("name", companyData.name);
        formData.append("description", companyData.description);
        formData.append("location", companyData.location);
        formData.append("website", companyData.website);
        if(file !== null){
            formData.append("file", file);
        }
      
        
        const {data} = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/company/update-company/${id}`, formData,
         {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
         }
        );
        if (data?.success) {
          toast.success(data?.message) 
          navigate("/admin/companies") 
        }
       
        } catch (error) {
           console.log(error.response.data.message);
            toast.error(error?.response?.data?.message);
        }
        finally {
          dispatch(setLoading(false));
        }
  };
  return (
    <div className="">
      <div className="flex gap-5 items-center">
        <Button variant="outline">
          <i className="fa-solid fa-arrow-left-long"></i>
          <span>Back</span>
        </Button>
        <h1 className="text-3xl font-bold">Company Setup</h1>
      </div>
      <div className="max-w-4xl mt-12 mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Create Company
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={companyName?.name || companyData.name}
              onChange={handleChange}
              required
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company name"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={companyData.description}
              onChange={handleChange}
              rows={"15"}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company description"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={companyData.location}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company location"
            />
          </div>

          {/* Website */}
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={companyData.website}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com"
            />
          </div>

          {/* Logo */}
          <div>
            <label
              htmlFor="logo"
              className="block text-sm font-medium text-gray-700"
            >
             Upload Company Logo
            </label>
            <input
              type="file"
              id="logo"
              name="file"
              onChange={(e)=> setFile(e.target.files[0])}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter logo URL"
            />
          </div>
          <div>
            <img className="mx-auto" width="250" src={file ? URL.createObjectURL(file) : location.state ? location.state.logo : ""}></img>
          </div>

          {/* Submit Button */}
          <div>
          {loading ? (
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i> Please
              Wait...
            </button>
          ) : (
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2">
             Submit
            </button>
          )}
           
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
