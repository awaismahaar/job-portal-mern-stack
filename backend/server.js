const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const connectDb = require("./config/db");
const userRoute = require("./routes/userRoute")
const companyRoute = require("./routes/companyRoute")
const jobRoute = require("./routes/jobRoute")
const appRoute = require("./routes/applicationRoute")
require("dotenv").config();
const path = require("path");
const app = express();

// connect to database
connectDb();


// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cors(corsOptions));

//routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", appRoute);

// Serve static files from the frontend/dist folder
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Catch-all route to serve the index.html file
app.all("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))