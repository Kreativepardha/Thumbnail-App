import { ZodError } from "zod";
// import { v4 as uuidv4 } from "uuid";
// import fs from "fs";
import ejs from "ejs";
import { fileURLToPath } from "url";
import * as path from "path";






export const formatError = (error: ZodError):any => {
    let errors:any = {}
    error.errors?.map((issue) => {
        errors[issue.path?.[0]] = issue.message
    })

    return errors
}


export const renderEmailEjs = async (fileName: string, payload:any) => {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const html = await ejs.renderFile(
      __dirname + `/views/emails/${fileName}.ejs`,
      payload
    );
    return html;
  };