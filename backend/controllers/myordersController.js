const {Orders} = require("../db")

const fetchOrdersByPhone = async (req, res) => {
    try {
        const { userPhone } = req.body;
        const data = await Orders.find({ userPhone });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch orders" });
    }
};

module.exports = {
    fetchOrdersByPhone
};