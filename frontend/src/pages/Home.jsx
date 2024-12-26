import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import { useSelector } from "react-redux"
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate()
  const {user} = useSelector(store => store.auth);
  useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies");
    }
  },[])
  return (
    <>
    <Navbar/>
    <div className="px-12 py-8">
    <Outlet/>
    </div>
    </>
  )
}

export default Home