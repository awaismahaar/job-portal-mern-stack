import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCompanyByName } from "../../slices/companySlice";
import useGetAdminJobs from "../../hooks/useGetAdminJobs";
function AdminJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAdminJobs();
  const {adminJobs} = useSelector((store) => store.jobs);
  const [input, setInput] = useState("");
  const [filterJob, setFilterJob] = useState(adminJobs);
  useEffect(() => {
    const filteredData =
    adminJobs.length >= 0 &&
    adminJobs.filter((job) => {
        if (!input) {
          return true;
        }
        return job?.title
          .toLowerCase()
          .includes(input.toLowerCase()) ||
           job.companyId.name.toLowerCase().includes(input.toLowerCase());
      });
      setFilterJob(filteredData);
  }, [input, adminJobs]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/4 mt-5 h-12 rounded-full border-2 text-lg bg-white border-red-500">
          <input
            className="outline-none border-none w-full h-full rounded-full pl-3"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter by Name and role..."
          ></input>
        </div>
        <Button onClick={() => navigate("/admin/create-job")}>
          Create Job
        </Button>
      </div>

      <div className="mt-10">
        <h1 className="text-4xl my-6 font-bold">Jobs List</h1>
        <Table>
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Company Name</TableHead>
              <TableHead className="text-lg">Role</TableHead>
              <TableHead className="text-lg">Date</TableHead>
              <TableHead className="text-right text-lg">Action</TableHead>
              <TableHead className="text-right text-lg">Applicants</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterJob?.length === 0 ? (
              <h1 className="text-3xl text-bold my-4">No Jobs Found</h1>
            ) : (
                filterJob?.map((job) => (
                <TableRow
                  key={job._id}
                  className="hover:bg-gray-200 transition-colors"
                >
                  <TableCell className="text-lg">
                   {job.companyId.name}
                  </TableCell>
                  <TableCell className="text-lg text-blue-600">
                    {job.title}
                  </TableCell>
                  <TableCell className="text-lg text-green-600">
                    {new Date(job.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-lg text-right">
                    <Button
                      onClick={() =>
                        navigate(`/admin/update-job/${job._id}`, {
                          state: job,
                        })
                      }
                      variant="outline"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  </TableCell>
                  <TableCell className="text-lg text-right">
                    <Button
                      onClick={() =>
                        navigate(`/admin/applicants/${job._id}`)
                      }
                      variant="outline"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
export default AdminJobs;
