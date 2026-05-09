import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN
}));
// Enables Cross-Origin Resource Sharing.
// Allows frontend from allowed origin (e.g. React app) to call backend API.
// credentials:true is needed if frontend sends cookies/auth headers.

app.use(express.json())
// Parses incoming JSON request body.
// Example:
// req.body from:
// { "email": "test@gmail.com" }

app.use(express.urlencoded())  //while searching there are spaces between search so this encodes those speacial characters
// Parses form data / URL-encoded data.
// Example form submission:
// name=Rudra&age=20
// Converts it into req.body object.
// extended:true allows nested objects.

app.use(express.static("public"))  // To store images and else
// Serves static files from "public" folder.
// Example:
// public/image.png
// accessible via:
// http://localhost:8000/image.png

app.use(cookieParser())  // This is used to access and set cookies of user from our server  
// Parses cookies from request headers.
// Makes cookies available as:
// req.cookies.accessToken
// Also helps in auth flows using refresh/access tokens.

export {app}