const db = require('../config/db.config');

const getAllUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await db.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name, email]
        );
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const [result] = await db.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email,  req.params.id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ id: req.params.id, name, email });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
