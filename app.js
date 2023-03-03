require('dotenv').config();
require('express-async-errors');
const connectDB = require('./db/connect');
const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const PORT = process.env.PORT || 5000;
const productsRouter = require('./routes/products');

// swagger at /api/v1/docs
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./utils/openapi.json');
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// middlewares
app.use(express.json());

// uncomment below code if you want to access this API from any request outside the server.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// routes
app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Store API</h1><a href="/api/v1/products">Click to view products</a>`)
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    };
};

start();
