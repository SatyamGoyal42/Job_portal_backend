export const errorMIddleware = (err,req,res,next)  =>{
    console.log(err)
    res.status(500).send({
        sucess:false,
        message:"something went wrong",
        err
    })
}