require('dotenv').config();

const {cronRun} = require('./cron');
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const {PORT} = require("./config");
const path = require('path');


const app = express();
const db = require('./database').getInstance();
db.setModels();

app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());

cronRun();

const {authRouter, productRouter, userRouter} = require('./routes');

app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 400)
        .json({
            message: err.message,
            code: err.customCode
        })
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Hello from ${PORT}...`);
    }
});

process.on('unhandledRejection', reason => {
    console.log(reason);

    process.exit(0);
});
