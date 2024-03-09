require('dotenv').config()
require('express-async-errors')


const express = require('express')
const app = express()

const projectsRouter = require('./routes/projects')
const connectDB = require('./db/connect')
const errorhandler = require('./middlewares/error-handler-middleware')
const notFound = require('./middlewares/not-found')

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  })
);

app.use('/api/v1/projects',projectsRouter)

app.use(errorhandler)
app.use(notFound)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port:${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()