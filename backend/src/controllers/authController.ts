import {Request, Response} from 'express'
import { registerSchema } from '../validations/authValidation';
import Prisma from '../config/database';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod';
import { formatError, renderEmailEjs } from '../helper';
import { emailQueue, emailQueueName } from '../jobs/EmailJobs';
import {  v4 as uuid4 } from 'uuid'


const JWT_SECRET = process.env.JWT_SECRET



export const register = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const payload = registerSchema.parse(body)

        let existingUser = await Prisma.user.findUnique({
            where:{ email: payload.email }
        });
        if(existingUser) {
            return res.status(400).json({
                message:"Email Already Taken"
            })
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(payload.password, salt)
        const emailToken = await bcrypt.hash(uuid4(), salt)
        const url  = `${process.env.CLIENT_APP_URL}/api/v1/auth/verify-email?email=${payload.email}&token=${emailToken}`
        const emailBody = await renderEmailEjs("email-verify",{name: payload.name, url: url})

        console.log("URL:::", url)

        // *send email

        await emailQueue.add(emailQueueName,{to: payload.email, subject:"Clash email verification", body: emailBody})

        const user = await Prisma.user.create({
            data:{
                name:payload.name,
                email:payload.email,
                password:hashedPassword,
                email_verify_token: emailToken,
            }
        })
        return res.json({ 
            message: "Please check your email , we havesent you a verification email",
            user: user
            });
    } catch (err) {
        if(err instanceof ZodError) {
            const errors = formatError(err)
            return res.status(422).json({
                message:"Invalid Data",
                errors
            });
        }
        return res.status(500).json({ message:"SOmething went wron. internal servcer error" , err })

    }
}
export const login = (req: Request, res: Response) => {
    try {
        const body = req.body;
    } catch (err) {
        return res.status(422).json(err);
    }
}
