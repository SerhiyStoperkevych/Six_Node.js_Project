const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;
const FILE_PATH = './items.json';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize users from the JSON file
let users = [];

const loadUsers = () => {
  if (fs.existsSync(FILE_PATH)) {
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    users = JSON.parse(data);
  }
};

const saveUsers = () => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));
};

// Load users at server start
loadUsers();

// Route to handle sign-up
app.post('/signUp', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = {
    id: Date.now(),
    username,
    password
  };

  users.push(newUser);
  saveUsers();
  res.status(201).json({ message: 'User created successfully' });
});

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.status(200).send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
