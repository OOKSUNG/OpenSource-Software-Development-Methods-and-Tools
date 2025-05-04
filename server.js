const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// POST
app.use(express.urlencoded({ extended : true}));
app.use(express.json());

// static file (HTML, css, js)
app.use(express.static(path.join(__dirname, 'public')));

//GET
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//POST
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    //database save or add
    console.log('Signup data:', { username, email, password});

    //success message respones
    res.send('<h1>Sign up success!</h1>');
});

// execute server
app.listen(PORT, () => {
    console.log('Server is running: http://0.0.0.0:${PORT}');
});
