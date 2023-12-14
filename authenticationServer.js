const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
const port = 3000;
app.use(bodyParser.json());

let users = [];

function generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

app.post('/signup', (req, res) => {
    try {
        if (!users.some(user => user.username === req.body.username)) {
            let user = {
                id: generateGuid(),
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName
            };
            users.push(user);
        } else {
            throw new Error("User already exists.");
        }
    } catch(e) {
        res.status(401).send(e.message);
    }
    
    res.status(201).send(users);
});

app.post('/login', async (req, res) => {
    try {
        let user = await users.find(user => user.username === req.body.username);
        if (user) {
            res.send(user);
        } else {
            throw new Error("Invalid credentials.")
        }
    }
    catch(e) {
        res.status(401).send(e.message);
    }
});

app.get('/data', async (req, res) => {
    let creds = {
        username: req.headers.username,
        password: req.headers.password
    }
    if (await users.find(user => user.username === creds.username && user.password === creds.password)) {
        let list = users.map((i) => {
            let data = {
                username: i.username,
                firstName: i.firstName,
                lastName: i.lastName
            }
            return data;
        });
        res.send(list);
    } else {
        res.status(401).send("Unauthorized");
    }
})

app.listen(port);