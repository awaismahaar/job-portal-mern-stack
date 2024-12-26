import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card";
  import { Badge } from "../ui/badge"
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
function Job({item}) {
  const navigate = useNavigate()
  return (
    <Card>
    <CardHeader>
    <div className='flex items-center gap-4'>
    <Button className="w-10 h-10"> <i className="fa-solid fa-bookmark"></i></Button>
      <CardTitle className="text-2xl">{item.companyId.name}</CardTitle>
      </div>
      <CardDescription>{formatDistanceToNow(new Date(item.createdAt))} ago</CardDescription>
      <CardDescription>{item.location}</CardDescription>
      <CardDescription>{item.title}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{item.description}</p>
    </CardContent>
    <CardFooter className="flex gap-3 flex-col items-start">
    <div className='flex gap-3 items-start'>
    <Badge className="bg-red-500">{item.position}</Badge>
    <Badge className="bg-pink-500">{item.jobType}</Badge>
    <Badge className="bg-yellow-500">24 LPA</Badge>
    </div>
    <div className='flex gap-3 justify-start'>
      <Button onClick={() => navigate(`/jobdetails/${item._id}`)} className="bg-blue-500">See Details</Button>
      <Button>Save For Later</Button>
    </div>
    </CardFooter>
  </Card>
  )
}

export default Job