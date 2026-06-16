import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import cookieParser from 'cookie-parser'
import authRouter from './route/authRoute.js'
dotenv.config()
import cors from "cors"
import userRouter from './route/userRoute.js'
import courseRouter from './route/courseRoute.js'
import paymentRouter from './route/paymentRoute.js'
import reviewRouter from './route/reviewRoute.js'

const port = process.env.PORT
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
   origin:"https://lms-1-8h75.onrender.com"
   ,
   credentials:true
}))



app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.use("/api/order",paymentRouter)
app.use("/api/review",reviewRouter)

app.get("/",(req,res)=>{
    res.send("Hello from Server")
})

// Generic error handler to return JSON for runtime errors and body parser errors
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err && err.stack ? err.stack : err)
    if (res.headersSent) return next(err)
    if (err && err.type === 'entity.parse.failed') {
        return res.status(400).json({ message: 'Invalid JSON payload' })
    }
    const status = err && err.status ? err.status : 500
    return res.status(status).json({ message: err && err.message ? err.message : 'Internal Server Error' })
})

app.listen(port , ()=>{
        console.log("Server Started")
        connectDb()
})
