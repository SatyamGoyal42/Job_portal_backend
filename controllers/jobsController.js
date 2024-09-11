import jobModels from "../models/jobModels.js"

export const createJobController = async (req,res,next)=>{
    const{company,position} = req.body
    if(!company || !position){
        next('Please Provide All fields')
    }
    req.body.createdBy = req.user.userId
    const job = await jobModels.create(req.body)

    res.status(201).json({job});
} 

export const getAllJobsController = async (req,res,next)=>{
    const jobs  = await jobModels.find({createdBy: req.user.userId});
    res.status(200).json({
        totalJobs : jobs.length,
        jobs
    })
}

export  const updateJobsController = async(req,res,next)=>{
    const {id}  = req.params
    const{company,position} = req.body

    if(!company || !position){
        next('please provide all fields')
    }
     const job = await jobModels.findOne({_id:id})
     if(!job){
        next(`no jobs found with this id ${id}`)
     }
     if(!req.user.userId === job.createdBy.toString()){
        next("You are not Authorized")
        return
     }
     const updateJob = await jobModels.findOneAndUpdate({_id:id},req.body,{
        new : true,
        runValidators:true
     })

     req.status(200).json({ updateJob})
}

export const deleteJobContoller =  async(req,res,next)=>{
    const {id} = req.params
    const job = await jobModels.findOne({_id:id})

    if(!job){
        next(`No job found with this ID ${id}`)
    }
    if(!req.user.userId === job.createdBy.toString()){
        next("You are not Authorized")
        return
     }
     await job.remove()

     res.status(200).json(
        {
            message: 'Success, Job Deleted!'
        }
    )

}