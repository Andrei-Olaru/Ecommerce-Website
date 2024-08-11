const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'andrey11',
    database: 'ecommerce'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// ---- Authentication Routes ---- 

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Insert new user
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) throw err;

            res.status(201).json({ message: 'User registered succesfully' });
        });
    });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password'});
        }

        const user = result[0];

        // Check password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: 'Invalid username or password'});
        }

        // Set session
        req.session.user = { id: user.id, username: user.username };

        res.status(200).json({ message: 'Logged in succesfully' });
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;

        res.status(200).json({ message: 'Logged out succesfully' });
    });
});