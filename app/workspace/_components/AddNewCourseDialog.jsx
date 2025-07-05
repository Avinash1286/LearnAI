"use client"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2Icon, Sparkle } from "lucide-react"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"
import { useRouter } from "next/navigation"

const AddNewCourseDialog = ({children}) => {
  const [loading, setLoading]=useState(false);
  const router=useRouter();
  const [formData, setFormData]=useState({
    name: '',
    description: '',
    noOfChapters: 1,
    includeVideo: false,
    level: 'beginner',
    category: ''
  });

  const onHandleInputChange=(field, value)=>{
    setFormData(prev=>({
        ...prev,
        [field]:value
    }));
    console.log(formData)
  }

  const onGenerate=async ()=>{  
    console.log(formData);
    const courseId=uuidv4();
    try{
    setLoading(true);
    const result=await axios.post('/api/generate-course-layout', {
        courseId,
        ...formData
    })
    console.log(result.data);
    setLoading(false);
    router.push(`/workspace/edit-course/${result?.data?.courseId}`);
    }
    catch(e){
        setLoading(false);
        console.log(e);
    }
    }
  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create New Course Using AI</DialogTitle>
      <DialogDescription asChild>
      <div className="flex flex-col gap-4 mt-3">
        <div>
            <label>Course Name</label>
            <Input placeholder="Course Name"
            onChange={(event)=> onHandleInputChange('name', event?.target.value)}
            />
        </div>

        <div>
            <label>Course Description (Oprional)</label>
            <Textarea placeholder="Course Description" onChange={(event)=> onHandleInputChange('description', event?.target.value)}/>
        </div>

        <div>
            <label>No. Of Chapters</label>
            <Input placeholder="0" type="number" onChange={(event)=> onHandleInputChange('noOfChapters', event?.target.value)}/>
        </div>

        <div className="flex gap-3 items-center">
            <label>Inclue Video</label>
            <Switch 
             onCheckedChange={()=> onHandleInputChange('includeVideo', !formData?.includeVideo)}
             checked={formData?.includeVideo}
            />
        </div>
            
        <div >
        <label>Difficulty Level</label>
            <Select className="mt-1" onValueChange={(value)=> onHandleInputChange('level', value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
        </div>


      <div>
        <label>Category</label>
        <Input placeholder="Category (Seperated by comma)" onChange={(event)=> onHandleInputChange('category', event?.target.value)}/>
      </div>

      <div className="mt-5">
       {loading 
       ? 
         <Button className={'w-full'} disabled={loading}>
             <Loader2Icon className="animate-spin"/> Generating...
            </Button>
        :
        <Button className={'w-full'} onClick={onGenerate}><Sparkle/> Generate Course</Button>}
      </div>

      </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewCourseDialog
