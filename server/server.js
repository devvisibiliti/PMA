import dotenv from'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import projectRoutes from './routes/projectRoutes.js'

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI).then(()=>console.log('MongoDB connected')).catch(err => console.log(err))

app.get('/',(req, res)=>{
    res.send('API is running...')
})

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT,() => {console.log(`Server is running on port ${PORT}`)})