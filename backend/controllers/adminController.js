const {Orders} = require("../db")

const getOrdersByOutlet = async (req, res) => {
    try {
        const outlet = req.params.outlet;
        const orders = await Orders.find({ outlet });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getOrdersByOutlet };