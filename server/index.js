const express = require('express');
const corsMiddleware = require('./middlewares/cors');

require('dotenv').config();

const databaseConfig = require('./config/database');

const recipeController = require('./router/recipeRouter');
const userController = require('./router/userRouter');
const cookieParser = require('cookie-parser');

start();

async function start() {
    const app = express();
    await databaseConfig(app);


    app.use(express.json());

    // app.use(corsMiddleware);

    app.use( (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next()
    })


    app.use(cookieParser());

    app.use('/api', recipeController);
    app.use('/api', userController);

    app.get('/', (req, res) => {
        res.json({ message: 'It works' })
    })

    app.listen(3000, () => console.log('Server started on port 3000'));
}