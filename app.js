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
app.use('/users', userRouter)

app.listen(5555, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Hello from 5555...');
    }
})
