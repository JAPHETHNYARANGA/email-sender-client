import nodemailer from 'nodemailer';
import prisma from '../prismaClient.js';
import { text } from 'stream/consumers';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER, // YOUR EMAIL
        pass:process.env.EMAIL_PASS //YOUR GMAIL APP PASSWORD
    }
});

const sendEmail = async(req,res)=>{
    const {fullname, email, service, message} = req.body;

     // Simple validation for input data
    if (!fullname || !email || !service || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try{
        const mailOptions = {
            from : email,
            to:'nyaranga4@gmail.com',   //recipients email
            subject:`New Contact Us Submission: ${service}`,
            text: `
            Full Name: ${fullname}
            Email: ${email}
            Service: ${service}
            Message: ${message}
          `,
        };

        await transporter.sendMail(mailOptions);

        await prisma.contact.create({
            data: {
                fullname,
                email,
                service,
                message,
              },
        });
          // Respond with success message
          res.status(200).json({ message: 'Email sent successfully!' });
    }catch(error){
        res.status(500).json({error:'Failed to send email. Please try again later'});
    }
}


export default { sendEmail}