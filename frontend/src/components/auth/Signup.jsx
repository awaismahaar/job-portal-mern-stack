import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner"

import "../../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "../ui/sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/authSlice";
function Signup() {
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("student");
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  function handleChangeInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("role", role);
    if(file !== null){
        formData.append("file", file);
    }
  
    
    const {data} = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/user/register`, formData,
     {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
     }
    );
    if (data?.success) {
      navigate("/login")
      toast.success(data?.message)  
    }
     
    } catch (error) {
       console.log(error.response.data.message);
        toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false));
    }

   
  }
  return (
    <>
    <section className="wrapper">
    <div className="container mt-52">
      <header>Sign Up</header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-box">
          <label>Full Name</label>
          <input
            name="fullName"
            value={input.fullName}
            onChange={handleChangeInput}
            type="text"
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="input-box">
          <label>Email Address</label>
          <input
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            type="email"
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="input-box">
          <label>Password</label>
          <input
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            type="password"
            placeholder="Enter Password"
            required
          />
        </div>

        <div className="input-box">
          <label>Phone Number</label>
          <input
            name="phone"
            value={input.phone}
            onChange={handleChangeInput}
            type="number"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div className="gender-box">
          <h3>Select Role</h3>
          <div className="gender-option">
            <div className="gender">
              <input type="radio" id="check-male" value={"student"} onChange={(e) => setRole(e.target.value)} name="role" defaultChecked />
              <label htmlFor="check-male">Student</label>
            </div>
            <div className="gender">
              <input type="radio" id="check-female" value={"recruiter"} onChange={(e) => setRole(e.target.value)} name="role" />
              <label htmlFor="check-female">Recruiter</label>
            </div>
          </div>
        </div>
        <div className="grid w-full mt-5 max-w-sm items-center gap-1.5">
          <Label className="text-sm font-medium" htmlFor="picture">
            Upload Profile Picture
          </Label>
          <Input
            accept="image/*"
            id="picture"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="flex justify-center mt-3">
          <img width="150" src={file ? URL.createObjectURL(file) : ""}></img>
        </div>
        <div className="mt-3">
          <p>
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
        {loading ? (
            <button type="submit">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i> Please
              Wait...
            </button>
          ) : (
            <button type="submit">
              Sign Up
            </button>
          )}
      </form>
    </div>
    </section>
    <Toaster/>
    </>
  );
}

export default Signup;
