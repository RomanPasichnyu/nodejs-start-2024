const express = require('express')
const dotenv = require('dotenv')
const fs = require('node:fs/promises');
const path = require('node:path');
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const dbPath = path.join(__dirname, 'data.json');

let users = [];

const loadUsers = async () => {
    const data = await fs.readFile(dbPath, 'utf8');
    users = JSON.parse(data);
};

// Read - GET
app.get('/users', async (req, res) => {
    await loadUsers();
    res.json(users);
});
app.get('/users/:userId', async (req, res) => {
    await loadUsers()
    const user = users.find(user => user.id === req.params.userId);
    console.log(req.params)
    res.json(user);
});


// Create - POST
app.post('/users', async (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser)
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2), 'utf8');
    res.status(201).json(newUser);
})

// Delete - DELETE
app.delete('/users/:userId', async (req, res) => {
    await loadUsers();
    const userId = req.params.userId;
    const initialLength = users.length;
    console.log(initialLength)

    users = users.filter(user => user.id !== userId);
    await fs.writeFile(dbPath, JSON.stringify(users, null, 2));
    res.status(204).send();

});
// Update - PUT



// CRUD

// create-users -> users (POST)
// get-list-users -> users (GET)
// get-user-by-id -> users/:id (GET)
// update-user -> users/:id (PUT)
// delete-user -> users/:id (DELETE)

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server has been started on port ${port}`);
})