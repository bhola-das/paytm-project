require('dotenv').config();
const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{console.log("connection successful backend is runing on port 3000")});