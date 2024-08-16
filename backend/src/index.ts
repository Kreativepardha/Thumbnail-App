import express, {Application, Request, Response} from 'express';
import 'dotenv/config'
import * as path from 'path'
import { fileURLToPath } from "url";
import ejs from "ejs";
import { sendEmail } from './config/mail';
const app:Application = express()
import './jobs/EmailJobs'
import { emailQueue, emailQueueName } from './jobs/EmailJobs';

const PORT = process.env.PORT || 3001

// const __dirname = path.dirname(fileURLToPath(import.meta.url))


app.use(express.json())
app.use(express.urlencoded({ extended:false }));

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname, "./views"))



app.get("/", async (req:Request, res:Response) =>{
    const html = await ejs.renderFile(__dirname + `/views/emails/welcome.ejs`, {
        name:"PArdha sAradhi",
    })
    await emailQueue.add(emailQueueName, { to:"hiyope6120@segichen.com" , subject:"Testing qeuee email", body:html})
    return res.json({
        messagae:"Email sent succesfffukly"
    })
})

app.use("/api/v1", mainRouter)





app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})