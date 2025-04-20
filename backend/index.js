const express = require("express");
const app = express();
const env = require("dotenv");
env.config();
PORT = process.env.PORT
app.use(express.json());

const cors = require("cors");
app.use(cors());

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const menuRoute = require("./routes/menu")
app.use("/menu",menuRoute)

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})