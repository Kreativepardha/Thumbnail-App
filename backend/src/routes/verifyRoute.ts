import { Router } from "express";
import Prisma from "../config/database";



const router = Router()

router.get("/verify-email", async(req, res) => {
    const {email, emailToken} = req.query

    if(email && emailToken) {   
        const user = await Prisma.user.findUnique({
            where: {
                email: email as string
                }
        })
        if(user) {
            if(emailToken === user.email_verify_token){
                await Prisma.user.update({
                    data:{
                        email_verify_token: null,
                        email_verified_At: new Date().toISOString()
                    },
                    where:{
                        email: email as string
                    }
                })
                return res.redirect(`${process.env.CLIENT_APP_URL}/api/v1/auth/login`)
            }
            return res.redirect("/verify-error")
        }
        return res.redirect("/verify-error")
        }
    return res.redirect("/verify-error")
})


router.get("/verify-error", async (req,res) => {
    return res.render("/auth/verifyEmailError")
})












export {
    router as verifyRouter
}