const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const credentialsFile = 'login.txt';

// Read credentials from the file
function readCredentials() {
    const data = fs.readFileSync(credentialsFile, 'utf8');
    const lines = data.split('\n');
    const credentials = {};
    lines.forEach(line => {
        const [user, pass] = line.split(':');
        if (user && pass) {
            credentials[user.trim()] = pass.trim();
        }
    });
    return credentials;
}

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const credentials = readCredentials();

    if (credentials[username] === password) {
        res.json({ message: 'Login successful!' });
    } else {
        res.json({ message: 'Invalid username or password.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
