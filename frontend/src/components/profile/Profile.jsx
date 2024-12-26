import React, { useState } from "react";
import "../../css/Profile.css";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import UpdateProfileDailog from "./UpdateProfileDailog";
import useGetAppliedJobs from "../../hooks/useGetAppliedJobs";
const tableData = [
  {
    date: "2024-11-15",
    jobRole: "Software Engineer",
    company: "TechCorp",
    status: "Accepted",
  },
  {
    date: "2024-10-10",
    jobRole: "Frontend Developer",
    company: "DesignX",
    status: "Completed",
  },
  {
    date: "2024-08-20",
    jobRole: "Backend Developer",
    company: "WebSolutions",
    status: "Accepted",
  },
  {
    date: "2024-07-25",
    jobRole: "Full Stack Developer",
    company: "InnovateTech",
    status: "Accepted",
  },
  {
    date: "2024-09-05",
    jobRole: "DevOps Engineer",
    company: "CloudWorks",
    status: "Pending",
  },
  {
    date: "2024-06-18",
    jobRole: "Product Manager",
    company: "TechFlow",
    status: "Completed",
  },
  {
    date: "2024-05-10",
    jobRole: "Data Scientist",
    company: "DataVision",
    status: "Pending",
  },
  {
    date: "2024-04-03",
    jobRole: "UI/UX Designer",
    company: "CreativeLabs",
    status: "Active",
  },
  {
    date: "2024-03-28",
    jobRole: "QA Engineer",
    company: "QualityFirst",
    status: "Completed",
  },
  {
    date: "2024-02-14",
    jobRole: "Project Manager",
    company: "BuildTech",
    status: "Inactive",
  },
];

const mernSkills = [
  "React.js",
  "Redux",
  "Node.js",
  "MongoDB",
  "Express.js",
  "JavaScript",
  "CSS",
  "RESTful APIs",
  "JWT Authentication",
  "Material-UI",
  "Bootstrap",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "HTML",
];

const backgroundColors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33A6",
  "#FF5733",
  "#8E44AD",
  "#F39C12",
  "#09D81C",
  "#E75B9B,",
  "#B9069F",
  "#206ED5",
  "#1152C4",
  "#099C74",
  "#1E8983",
];
function Profile() {
  useGetAppliedJobs()
  const { user } = useSelector((store) => store.auth);
  const { allAppliedJobs } = useSelector((store) => store.jobs);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <div className="wrapper">
          <div className="profile-card js-profile-card">
            <div className="profile-card__img">
              <img src={user.profile.profilePhoto} alt="profile card" />
            </div>
            <div className="absolute top-2 right-2">
              <Button onClick={()=> setOpen(true)} variant="outline">
                <i className="fa-solid fa-pen"></i>
              </Button>
            </div>
            <div className="profile-card__cnt js-profile-cnt">
              <div className="profile-card__name">{user.fullName}</div>
              <div className="profile-card__txt">Mern Stack Developer</div>
              <div className="profile-card-loc">
                <span className="profile-card-loc__icon">
                  <svg className="icon">
                    <use xlinkHref="#icon-location" />
                  </svg>
                </span>
                <span className="profile-card-loc__txt">
                  Gujranwala, Pakistan
                </span>
              </div>
              <div className="flex gap-2 items-center justify-center mt-2">
                <i className="fa-solid fa-envelope text-2xl"></i>
                <p>{user.email}</p>
              </div>
              <div className="flex gap-2 items-center justify-center mt-2">
                <i className="fa-solid fa-address-book text-2xl"></i>
                <p>{user.phone}</p>
              </div>
              <div className="flex gap-2 flex-col items-center justify-center mt-2">
               <h1 className="text-2xl profile-card__name">Resume</h1>
                <a className="text-lg underline" href={user?.profile?.resume} target="_blank">{user?.profile?.resumeOriginalName}</a>
              </div>
              <div className="profile-card__name mt-2">Skills</div>
              <hr className="w-1/4 m-auto h-1 bg-blue-500 rounded-full" />
              <div className="flex flex-wrap gap-2 items-center justify-center mt-2">
                {mernSkills.map((skill, index) => (
                  <Badge
                    style={{
                      backgroundColor: backgroundColors[index],
                      fontSize: "16px",
                    }}
                    key={index}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
        <h1 className="w-3/4 m-auto text-4xl my-2 font-bold">Applied Jobs</h1>
          <Table className="w-3/4 m-auto">
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg">Date</TableHead>
                <TableHead className="text-lg">Job role</TableHead>
                <TableHead className="text-lg">Company</TableHead>
                <TableHead className="text-right text-lg">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAppliedJobs.map((job) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-gray-200 transition-colors"
                >
                  <TableCell className="text-lg">{new Date(job.createdAt).toDateString()}</TableCell>
                  <TableCell className="text-lg text-blue-600">
                    {job.job.title}
                  </TableCell>
                  <TableCell className="text-lg text-green-600">
                    {job.job.companyId.name}
                  </TableCell>
                  <TableCell className="text-lg text-right">
                    <Badge
                      className={
                        job.status === "accepted"
                          ? "bg-green-500"
                          : job.status === "pending"
                          ? "bg-blue-500"
                          : "bg-red-500"
                      }
                    >
                      {job.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <UpdateProfileDailog open={open} setOpen={setOpen}/>
    </>
  );
}

export default Profile;
