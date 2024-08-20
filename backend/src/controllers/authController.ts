import {Request, Response} from 'express'
import { registerSchema } from '../validations/authValidation';
import Prisma from '../config/database';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod';
import { formatError } from '../helper';


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
        
        // const emailToken = await bcrypt.hash(uuidv4(), salt)

        const user = await Prisma.user.create({
            data:{
                name:payload.name,
                email:payload.email,
                password:hashedPassword,
                // email_verify_token: ,
            }
        })
        
        const token = jwt.sign({
            userId:user.id,
             email: user.email
        }, JWT_SECRET as string)


        return res.json({ 
            message: "User created successfully!",
            token:`Bearer ${token}`
            });
    } catch (err) {
        if(err instanceof ZodError) {
            const errors = formatError(err)
            return res.status(422).json({
                message:"Invalid Data",
                errors
            });
        }
        return res.status(500).json({ message:"SOmething went wron. internal servcer error"  })

    }
}

export const login = (req: Request, res: Response) => {
    try {
        const body = req.body;
        
    } catch (err) {
        return res.status(422).json(err);
    }
}