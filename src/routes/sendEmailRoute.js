import express from 'express';
import sendEmailController from '../controllers/sendEmailController';

const router =  express.Router()


router.post('/', sendEmailController.sendEmail)



export default router