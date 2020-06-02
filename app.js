const express = require('express');
// const expressBars = require('express-handlebars');
// const path = require('path');

const app = express();
const db = require('./database').getInstance();

app.use(express.json());
app.use(express.urlencoded());
db.setModels();

// app.use(express.static(path.join(__dirname, 'views')));
//
// app.engine('.hbs', expressBars({
//     defaultLayout: false,
//     extname: '.hbs'
// }))
//
// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'views'));

const { productRouter, userRouter } = require('./routes');

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

app.listen(5555, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Hello from 5555...');
    }
});

process.on('unhandledRejection', reason => {
    console.log(reason);

    process.exit(0);
});
