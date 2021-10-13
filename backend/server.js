import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import { NotFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './config/db.js'
import productRoutes from './routers/productRoutes.js';
import uploadRoutes from './routers/uploadRoutes.js';
import sendEmail from './routers/sendEmail.js'
dotenv.config()
connectDB()



const app = express()
if(process.env.NODE_ENV === 'developement'){
  app.use(morgan('dev'))
}

app.use(cors())

app.use(express.json())



app.use('/api/products', productRoutes)  
app.use('/api/upload', uploadRoutes) 
app.use('/api/forma', sendEmail)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) 

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*',(req,res)=>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}else{
app.get('/', (req, res) => {
    res.send('api is running.....') 
}) 
}






app.use(NotFound)

app.use(errorHandler)



const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))