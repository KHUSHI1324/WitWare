const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const server = http.createServer(app);
// const authent=require('./middleware/Authentication')
app.use(cors({
  origin: "http://localhost:3000", // Change this to the origin of your frontend server
  withCredentials: true,
  Credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser(""));
// app.use(authent);


// const datas =require('./modules/ProductSchema');
const defaultData=require('./DefaultData');

const router=require('./Routes/productRouter');
app.use(router);

server.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
  
mongoose.connect("mongodb://0.0.0.0:27017/E-com")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });


defaultData();