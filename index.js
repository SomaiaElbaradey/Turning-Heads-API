require('express-async-errors');
const express = require('express');
const app = express();
const config = require('config');
const error = require('./middlewares/error');

require('./dbConnection');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json());
app.use(express.json({ limit: "50mb" }));

app.use(cors())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

//middleware that logs the request url, method, and current time 
let logs = (req, res, next) => {
    console.log('the request url:', req.url);
    console.log('the request method:', req.method);
    console.log('the current time:', new Date());
    next();
};
app.use(logs);

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

app.use(error);

var server = app.listen(process.env.PORT || 4000, () => {
    console.info(`server listening on port 3919`);
});

module.exports = server
