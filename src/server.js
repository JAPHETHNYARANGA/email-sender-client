import express from 'express';
import sendEmailRoute from './routes/sendEmailRoute.js';


const app = express()
const PORT = process.env.port || 5003

app.use(express.json())


app.use('/api/sendMail', sendEmailRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });