const express = require('express');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const https = require('https');
const fs = require('fs');

const httpsOptions = {
    key: fs.readFileSync('./ssl.key'),
    cert: fs.readFileSync('./ssl.crt'),
}

const corsOptions = {
    origin: true,
    credentials: true
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());

function getToken(username) {
    const access_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "1m"
    });
    const refresh_token = jwt.sign({ username }, 'hhh', {
        expiresIn: "7d"
    });
    return { access_token, refresh_token };
}


app.get('/hello', (req, res) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        res.status(401).send('not login!');
    }
    try {
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, 'hhh');
        console.log(data);
    } catch (e) {
        console.log(e);
        res.status(401).send('Token expired, please login!');
    }
    res.send('Hello!!');
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    const { access_token, refresh_token } = getToken(username);
    res.cookie('access_token', access_token, {
        httpOnly: true
    });
    res.cookie('refresh_token', refresh_token, {
        httpOnly: true
    });
    res.send({ access_token, refresh_token });
});

app.get('/refresh', (req, res) => {

    try {
        const params = req.query;
        const { token } = params;
        const data = jwt.verify(token, 'hhh');
        console.log(data);
        if (data) {
            res.send(getToken());
        }
    } catch (e) {
        console.log(e);
        res.status(401).send('Token expired, please login!');
    }
})

// app.listen(7070, () => {
//     console.log('success build');
// });

const server = https.createServer(httpsOptions, app);
server.listen(7070, () => {
    console.log('success!!');
})