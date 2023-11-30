import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import homeRoute from "./routes/home.js";
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser";
import cors from "cors";
// import path from 'path'
// import { fileURLToPath } from "url" // for es6 to avoid error during deployment

const app = express();
dotenv.config();

// database config
 connectDB()

// ES6 Module fixed
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

//middlewares
const corsOptions ={
  origin:true,
  credentials:true
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());
app.use(morgan('dev'))

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use("/home", homeRoute);

// // for deployment
// app.use(express.static(path.join(__dirname, './frontend/build')))

// // for deployment
// app.use('*', function(req, res){
//     res.sendFile(path.join(__dirname, './frontend/build/index.html'))
// })


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 8000

// run listen
// template literal
app.listen(PORT, () =>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
});