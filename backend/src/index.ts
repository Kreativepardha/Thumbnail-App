import express, {Application, Request, Response} from 'express';
import 'dotenv/config'


const app:Application = express()


const PORT = process.env.PORT || 3001


app.get("/", (req:Request, res:Response) =>{
    res.json({
        message:"Health Check"
    })
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})