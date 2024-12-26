import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import CategoryCarousel from "./CategoryCarousel";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../slices/jobSlice";
import {useNavigate} from "react-router-dom"

function Hero() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = () => {
    dispatch(setSearchQuery(query))    
    navigate("/browse")
  }
  
  return (
    <div className="h-[80vh] w-full">
    <div className="flex w-full items-center">
    <div className="w-2/4">
      <h1 className="text-4xl font-bold px-4 py-2 w-fit rounded-full bg-red-500 border-4 border-yellow-500 text-white">
        {" "}
        NO. 1 Job Hunt Portal
      </h1>
      <br />
      <h1 className="text-6xl font-bold">
        Search, <span className="text-red-500">Apply</span>
        <br /> and Get your{" "}
        <span className="text-red-500">
          <br /> dream job
        </span>
      </h1>
      <br />
      <p className="text-2xl w-3/4">
        Get your dream job and grow your career. We are here to help you find
        your dream job.
      </p>
      <div className="flex items-center w-2/4 mt-5 h-12 rounded-full border-2 text-lg bg-white border-red-500">
      <input
        className="outline-none border-none w-full h-full rounded-full pl-3"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your dream job..."
      ></input>
      <button onClick={handleSearch} className="bg-black text-white text-2xl h-full w-16 rounded-full"><i className="fa-brands fa-searchengin"></i></button>
      </div>
    </div>
    <div className="w-2/4 px-4">
    <Carousel className="w-full">
      <CarouselContent>
        {["./images/job.avif", "./images/job1.avif", "./images/job2.webp"].map((image, index) => (
          <CarouselItem key={index}>
          <img className="w-full h-full rounded-lg shadow-lg" src={image}></img>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  
    </div>
    </div>
    <CategoryCarousel/>
    </div>
  );
}

export default Hero;
