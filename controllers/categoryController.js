const db = require('../config/db.config');

const getAllCategory = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};


module.exports = {
    getAllCategory,
};
