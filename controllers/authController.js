const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.config');

const register = async (req, res) => {
    try {
      
        console.log("asdhajkhdkahdka");

        const { name, email, password } = req.body;
      
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({statusCode:400, errorMessage: 'User already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password,) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        

        // Generate token
        const token = jwt.sign(
            { user_id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        
        return res.status(201).json({
            statusCode: 201,
            data: {
              id: result.insertId,
              name,
              email,
              token
            }
          });
          
    } catch (error) {
        console.log(error);
        console.log(error.sqlMessage);
        res.status(500).json({ statusCode: error.status, error: error.sqlMessage });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
       
        // Check if user exists
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
       
    

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const user = users[0];
    
        
const plainPassword = password;
const hashedPassword = await bcrypt.hash(plainPassword, 10);

// Now compare using plain text and hash
const isValid = await bcrypt.compare(plainPassword, hashedPassword);
console.log(isValid); // true

        if (!isValid) {
            return res.status(401).json({ statusCode:401,   errorMessage: 'Invalid credentials' });
        }
        
        // Generate token
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );
        
        res.json({ 
            statusCode:200, 
            data:{
            id: user.id,
            name: user.name,
            email: user.email,
            token
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

module.exports = {
    register,
    login
};
