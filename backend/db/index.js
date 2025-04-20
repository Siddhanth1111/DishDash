const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
    name : String,
    phone : Number,
})

const southernSchema = new mongoose.Schema({
    food : String,
    price : Number
})
const quenchSchema = new mongoose.Schema({
    food : String,
    price : Number
})
const kathiSchema = new mongoose.Schema({
    food : String,
    price : Number
})

const User = mongoose.model("user",userSchema);
const Southern = mongoose.model("southern_Menu",southernSchema);
const Kathi = mongoose.model("kathi_Menu",kathiSchema);
const Quench = mongoose.model("quench_Menu",quenchSchema);

module.exports = {
    User,
    Southern,
    Kathi,
    Quench
}
