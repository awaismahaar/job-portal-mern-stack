import React, { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../slices/companySlice";

function CreateCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");
  async function handleSubmit() {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_REACT_APP_URL}/company/create-company`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(data?.success){
        toast.success(data.message);
        setCompanyName("");
        dispatch(setSingleCompany(data?.company));
        navigate(`/admin/company/${data?.company?._id}`);
      }
    } catch (error) {
      toast.error(error?.response?.data.message);

    }
  }
  return (
    <>
      <div className="flex justify-center items-center w-full h-[80vh]">
        <div className="flex gap-5 flex-col justify-center w-3/4 items-center">
          <h1 className="text-3xl">Create Company</h1>
            <div className="flex flex-col gap-2 w-96">
              <label className="text-lg">Enter Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Microsoft, Google, etc."
                className="border-2 border-black rounded-md p-2 w-full"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => navigate("/admin/companies")} variant="destructive">Cencel</Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
      </div>
    </>
  );
}

export default CreateCompany;
