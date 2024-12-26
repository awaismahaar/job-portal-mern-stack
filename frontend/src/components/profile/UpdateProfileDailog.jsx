import React, { useState } from 'react'
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '../../slices/authSlice'
import axios from 'axios'
import { toast } from 'sonner'
function UpdateProfileDailog({open,setOpen}) {
    const { loading , user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [input, setInput] = useState({
      fullName: user?.fullName || "",
      email:user?.email || "",
      phone: user?.phone || "",
      skills : "",
      bio : ""
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
        formData.append("phone", input.phone);
        formData.append("skills", input.skills);
        formData.append("bio", input.bio);
        if(file !== null){
            formData.append("file", file);
        }
     
        
        const {data} = await axios.put(`${import.meta.env.VITE_REACT_APP_URL}/user/update-profile`, formData,
         {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
         }
        );
        if (data?.success) {
          setOpen(false)
          dispatch(setUser(data?.user))
          localStorage.setItem("user", JSON.stringify(data?.user));
          toast.success(data?.message)  
        }
         
        } catch (error) {
           console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message);
        }
        finally {
          dispatch(setLoading(false));
        }
    
       
      }
  return (
    <Dialog open={open} setOpen={setOpen}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
      </DialogHeader>
      <div className="grid gap-2 py-4">
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
        <div className="input-box">
          <label>Skills</label>
          <input
            name="skills"
            value={input.skills}
            onChange={handleChangeInput}
            type="text"
            placeholder="Enter Your Skills (quma, separated)"
            required
          />
        </div>
        <div className="input-box">
          <label>Bio</label>
          <input
            name="bio"
            value={input.bio}
            onChange={handleChangeInput}
            type="text"
            placeholder="Enter Your Bio"
            required
          />
        </div>
        <div className="grid w-full mt-5 max-w-sm items-center gap-1.5">
          <Label className="text-sm font-medium" htmlFor="file">
            Upload Resume
          </Label>
          <Input
            id="file"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        {loading ? (
            <Button type="submit">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i> Please
              Wait...
            </Button>
          ) : <DialogFooter>
        <Button type="submit">Update</Button>
      </DialogFooter>}
          
      </form>     
      </div>
    </DialogContent>
  </Dialog>
  )
}

export default UpdateProfileDailog