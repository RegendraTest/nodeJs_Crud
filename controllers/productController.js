const db = require('../config/db.config');

const getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (product.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

        const [result] = await db.query(
            'INSERT INTO products (name, description, price, stock, image) VALUES (?, ?, ?, ?, ?)',
            [name, description, price, stock, image]
        );

        res.status(201).json({
            id: result.insertId,
            name,
            description,
            price,
            stock,
            image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating product' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const image = req.file ? req.file.path.replace(/\\/g, '/') : undefined;

        // Get existing product to check if it exists
        const [existingProduct] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (existingProduct.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Build update query dynamically based on provided fields
        const updates = [];
        const values = [];
        
        if (name) {
            updates.push('name = ?');
            values.push(name);
        }
        if (description !== undefined) {
            updates.push('description = ?');
            values.push(description);
        }
        if (price) {
            updates.push('price = ?');
            values.push(price);
        }
        if (stock !== undefined) {
            updates.push('stock = ?');
            values.push(stock);
        }
        if (image) {
            updates.push('image = ?');
            values.push(image);
        }

        values.push(req.params.id);

        const [result] = await db.query(
            `UPDATE products SET ${updates.join(', ')} WHERE id = ?`,
            values
        );

        res.json({
            id: req.params.id,
            name: name || existingProduct[0].name,
            description: description !== undefined ? description : existingProduct[0].description,
            price: price || existingProduct[0].price,
            stock: stock !== undefined ? stock : existingProduct[0].stock,
            image: image || existingProduct[0].image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating product' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
