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
    password: 'your_password',
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
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static(__dirname));

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// ---- Authentication Routes ---- 

// Register
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (result.length > 0) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }

            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Server error' });
                }
                res.status(200).json({ success: true, message: 'User registered successfully' });
            });
        });
    });
});

// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ loggedIn: false, message: 'An error occurred on the server.' });
        }

        if (result.length === 0) {
            return res.status(401).json({ loggedIn: false, message: 'Invalid username or password.' });
        }

        const user = result[0];

        // Check password
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ loggedIn: false, message: 'Invalid username or password.' });
        }

        // Set session
        req.session.user = { id: user.id, username: user.username };

        // Send JSON response for successful login
        res.json({ loggedIn: true, message: 'Login successful.' });
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;

        res.redirect('/');
    });
});

// Serve static files
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Check login status
app.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true });
    } else {
        res.json({ loggedIn: false });
    }
});
