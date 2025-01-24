import express from 'express';
import sendEmailRoute from './routes/sendEmailRoute.js';


const app = express()
const PORT = process.env.port || 5000

app.use(express.json())


app.use('/api/sendMail', sendEmailRoute)

app.listen(PORT)