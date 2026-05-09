import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN
}))

app.use(express.json())
app.use(express.urlencoded())  //while searching there are spaces between search so this encodes those speacial characters
app.use(express.static("public"))  // To store images and else
app.use(cookieParser())  // This is used to access and set cookies of user from our server  
export {app}