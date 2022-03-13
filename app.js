const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); // to get info for each request
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

app.use("/uploads", express.static("uploads")) // use uploads folder to save image

// Connect mongodb in local
mongoose.connect("mongodb://127.0.0.1:27017/uploadimage").then(()=> console.log("Database Connected"));

// check connection to database
mongoose.connection.on("error", err => {
  console.log(`Database connection error ${err.message}`);
});



// Middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json())
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

app.use(cors());

// import category route
app.use("/api", require("./routes/category.routes.js"))

// Page not found 404
app.use((err, req, res, next) => {
  res.status(404).json({
    errors: err.stack
  })
})

const PORT = process.env.PORT || 8000

app.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`)
})


