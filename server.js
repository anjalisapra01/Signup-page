const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the signup page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle the signup form submission
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    // Create a string of the user data
    const userData = `Name: ${name}, Email: ${email}, Password: ${password}\n`;

    // Append the user data to a file
    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send('Signup successful! Your data has been saved.');
        }
    });
});

// Route to read and display the content of users.txt
app.get('/users', (req, res) => {
    fs.readFile('users.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(`<pre>${data}</pre>`);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
