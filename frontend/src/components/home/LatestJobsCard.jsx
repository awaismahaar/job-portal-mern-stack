import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge"
function LatestJobsCard() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Company Name</CardTitle>
          <CardDescription>Pakistan</CardDescription>
          <CardDescription>Job Title</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Description</p>
        </CardContent>
        <CardFooter className="flex gap-3">
        <Badge className="bg-red-500">12 Positions</Badge>
        <Badge className="bg-pink-500">Part Time</Badge>
        <Badge className="bg-yellow-500">24 LPA</Badge>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LatestJobsCard;
