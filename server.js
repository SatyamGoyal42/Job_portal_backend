// package imports
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan'
import "express-async-errors"
// files imports
import connectDB from './config/db.js'
import { errorMIddleware } from './middlewares/errorMiddleware.js'
//routes imports
import authRoutes from './routes/authRoutes.js'
import testRoutes from'./routes/testRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

// Dot env config
dotenv.config()
connectDB()

const PORT = process.env.PORT || 8080 ;
const app = express();


// app.get('/',(req,res)=>{
//     res.send("<h1> Welcome To Job Portal</h1>")
// })
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/test',testRoutes)
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/user',jobRoutes)


app.use(errorMIddleware)


app.listen(PORT,()=>{
    console.log(`Node Server Running in ${process.env.DEV_MODE} Mode on port ${PORT}`.bgWhite.black)
})
