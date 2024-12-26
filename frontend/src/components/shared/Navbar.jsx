import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.jsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth)
  async function handlelogout(){
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/user/logout`,
        {
         withCredentials: true,
        }
       );
      if (data?.success) {
        localStorage.removeItem("user");
        navigate("/login");
        toast.success(data.message);  
      }
 
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false); // Close the Popover when an item is clicked
  };

    // Effect to listen to the scroll event
    useEffect(() => {
      const handleScroll = () => {
        // Check if the window's scrollY position is greater than or equal to 20px
        if (window.scrollY >= 60) {
          setIsFixed(true);
        } else {
          setIsFixed(false);
        }
      };
  
      // Add scroll event listener
      window.addEventListener('scroll', handleScroll);
  
      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  return (
    <div className={`transition-all bg-white duration-500 ${isFixed ? 'fixed top-0 left-0 right-0 z-10 shadow-lg' : ''}`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="logo">
        <Link to={"/"}>
          <h1 className="text-3xl font-bold">
            Job <span className="text-red-700">Portal</span>
          </h1>
        </Link>
        </div>
        <ul className="flex items-center gap-4">
        {user?.role === "recruiter" ? 
        <>
          <Link to={"/admin/companies"}>
        <li className="cursor-pointer text-lg">Companies</li>
        </Link>
          <Link to={"/admin/jobs"}>
          <li className="cursor-pointer text-lg">Jobs</li>
          </Link>
          </> :
          <>
          <Link to={"/"}>
        <li className="cursor-pointer text-lg">Home</li>
        </Link>
          <Link to={"/jobs"}>
          <li className="cursor-pointer text-lg">Jobs</li>
          </Link>
         <Link to={"/browse"}>
         <li className="cursor-pointer text-lg">Browse</li>
         </Link>
          </>
        
        }
          {user ? (
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.profile.profilePhoto} />
                  <AvatarFallback>{user.fullName.substring(0, 1)}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-32">
                <ul className="flex flex-col gap-2 ">
                  <li  onClick={handleItemClick} className="cursor-pointer text-lg">{user?.fullName}</li>
                  {user?.role === "student" &&  
                  <Link to={"/profile"}>
                  <li  onClick={handleItemClick} className="cursor-pointer text-lg">
                    <i className="fa-solid fa-user"></i> Profile
                  </li>
                  </Link>
                  }
                  <li onClick={handlelogout} className="cursor-pointer text-lg">
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <>
            <Link to={"/signup"}><Button>Signup</Button></Link>
            <Link to={"/login"}><Button variant="outline">Login</Button></Link>
            
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
