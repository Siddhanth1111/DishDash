const {Kathi,Southern,Quench} = require("../db");

const getKathiOrders = async (req, res) => {
    try {
        const data = await Kathi.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Kathi orders' });
    }
};

const getSouthernOrders = async (req, res) => {
    try {
        const data = await Southern.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Southern orders' });
    }
};

const getQuenchOrders = async (req, res) => {
    try {
        const data = await Quench.find({});
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch Quench orders' });
    }
};

module.exports = {
    getKathiOrders,
    getSouthernOrders,
    getQuenchOrders,
};
