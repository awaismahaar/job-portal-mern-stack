import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "../../slices/jobSlice";
const jobCategories = [
  "Software Developer",
  "Data Scientist",
  "Cybersecurity Specialist",
  "DevOps Engineer",
  "UI/UX Designer",
  "Civil Engineer",
  "Architect",
  "Construction Manager",
  "Electrician",
  "Plumber",
];
function CategoryCarousel() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSearch = (job) => {
    dispatch(setSearchQuery(job))
    navigate("/browse")
  }
  return (
    <div className="pt-20 px-32">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {jobCategories.map((job, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/5 flex justify-center"
            >
              <Button onClick={()=> handleSearch(job)}>{job}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
