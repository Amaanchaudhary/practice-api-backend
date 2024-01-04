import dotenv from 'dotenv'
import { Router } from "express";
import express from "express";
import morgan from "morgan";
import cors from 'cors'
import { json } from 'express';
import router from './Routes/index.js';
import mongoose from 'mongoose';

const app = express();

dotenv.config();
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.get('/' , (req , res) => {
    res.send("Welcome to backend server")
})

app.use('/api/v1' , router )

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database connected"))
app.listen(8000, () => console.log("app is running on port 8000"))