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

const orderSchema = new mongoose.Schema({
    outlet : {
        type : String,
        enum : ["southern","kathi","quench"] 
    },
    userPhone : Number,
    orders :[],
    time : {
        type : Date,
        default : Date.now
    },
    totalPrice : Number,
    status : {
        type : String,
        enum : ["done","pending"],
        default : "pending"
    }

})

const User = mongoose.model("user",userSchema);
const Southern = mongoose.model("southern_Menu",southernSchema);
const Kathi = mongoose.model("kathi_Menu",kathiSchema);
const Quench = mongoose.model("quench_Menu",quenchSchema);
const Orders = mongoose.model("order",orderSchema)

module.exports = {
    User,
    Southern,
    Kathi,
    Quench,
    Orders
}
