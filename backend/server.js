const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoute = require("./route/authroute");
const cors = require("cors");
// configure env
dotenv.config();

// databse connect
connectDB();

// rest object
const app = express();

// rest api
app.get("/", (req, res) => {
  res.send("<h1> Welcome To Ecommerce App </h1>");
});

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1/auth", authRoute);

// port setup
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.bgCyan.white);
});
