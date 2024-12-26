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
import useGetAllCompanies from "../../hooks/useGetAllCompanies";
import { setSearchCompanyByName } from "../../slices/companySlice";
function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useGetAllCompanies();
  const { companies, searchCompanyByName } = useSelector(
    (store) => store.company
  );
  const [input, setInput] = useState("");
  const [filterCompany, setFilterCompany] = useState(companies);
  useEffect(() => {
    dispatch(setSearchCompanyByName(input));
    const filteredData =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByName) {
          return true;
        }
        return company.name
          .toLowerCase()
          .includes(searchCompanyByName.toLowerCase());
      });
    setFilterCompany(filteredData);
  }, [input, companies, dispatch, searchCompanyByName]);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/4 mt-5 h-12 rounded-full border-2 text-lg bg-white border-red-500">
          <input
            className="outline-none border-none w-full h-full rounded-full pl-3"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Filter Companies by Name..."
          ></input>
        </div>
        <Button onClick={() => navigate("/admin/create-company")}>
          Create Company
        </Button>
      </div>

      <div className="mt-10">
        <h1 className="text-4xl my-6 font-bold">Companies List</h1>
        <Table>
          <TableCaption>A list of your applied jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Logo</TableHead>
              <TableHead className="text-lg">Name</TableHead>
              <TableHead className="text-lg">Date</TableHead>
              <TableHead className="text-right text-lg">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterCompany?.length === 0 ? (
              <h1 className="text-3xl text-bold my-4">No Companies Found</h1>
            ) : (
              filterCompany?.map((company) => (
                <TableRow
                  key={company._id}
                  className="hover:bg-gray-200 transition-colors"
                >
                  <TableCell className="text-lg">
                    <Avatar>
                      <AvatarImage src={company.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="text-lg text-blue-600">
                    {company.name}
                  </TableCell>
                  <TableCell className="text-lg text-green-600">
                    {new Date(company.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="text-lg text-right">
                    <Button onClick={() => navigate(`/admin/company/${company._id}`, {state : company})} variant="outline">
                      <i className="fa-solid fa-pen-to-square"></i>
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

export default Companies;
