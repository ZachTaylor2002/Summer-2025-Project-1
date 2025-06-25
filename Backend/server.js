import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import serverless from '@vendia/serverless-express'

//app config
const app = express()
connectDB()
connectCloudinary()

//Middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)


app.get('/',(req,res)=>{
    res.send('API WORKING!!')

})

export const handler = serverless({ app })