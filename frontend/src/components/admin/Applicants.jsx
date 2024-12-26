import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "../../slices/applicantSlice";
import { useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { toast } from "sonner";
function Applicants() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {allApplicants} = useSelector(store => store.applicant)
  useEffect(() => {
    async function getAllApplicants() {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_URL}/application/get-applications/${id}`,
          {
            withCredentials: true,
          }
        );
        if (data?.success) {
        dispatch(setAllApplicants(data?.apply))
        }
     
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getAllApplicants();
  }, []);
  async function statusHandler(status,id) {
    try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_REACT_APP_URL}/application/update-status/${id}`,
          {status},
          {
            withCredentials: true,
          }
        );
        if (data?.success) {
        toast.success(data?.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
  }
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Applicants ({allApplicants?.applications?.length})</h1>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">Applicant Name</TableHead>
            <TableHead className="text-lg">Email</TableHead>
            <TableHead className="text-lg">Phone</TableHead>
            <TableHead className="text-right text-lg">Resume</TableHead>
            <TableHead className="text-right text-lg">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        
          {allApplicants?.applications?.map((application) => 
           <TableRow key={application._id}>
           <TableCell>{application.applicant.fullName}</TableCell>
            <TableCell>{application.applicant.email}</TableCell>
            <TableCell>{application.applicant.phone}</TableCell>
            <TableCell className="text-right">
                <a href={application.applicant.profile.resume} target="_blank">
                {application.applicant.profile.resumeOriginalName}
                </a>
            </TableCell>
            <TableCell className="text-right flex justify-end gap-2">
                <Button onClick={()=> statusHandler("accepted",application._id)} variant="outline">
                <i className="fa-solid fa-check"></i>
                </Button>
                <Button onClick={()=> statusHandler("rejected",application._id)} variant="destructive">
                <i className="fa-solid fa-xmark"></i>
                </Button>
            </TableCell>
           </TableRow>   
          )}
           
          
        </TableBody>
      </Table>
    </div>
  );
}

export default Applicants;
