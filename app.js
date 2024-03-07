require('dotenv').config()
require('express-async-errors')


const express = require('express')
const app = express()

const projectsRouter = require('./routes/projects')
const connectDB = require('./db/connect')
const errorhandler = require('./middlewares/error-handler-middleware')
const notFound = require('./middlewares/not-found')

app.use(express.json())
app.use('/api/v1/projects',projectsRouter)

app.use(errorhandler)
app.use(notFound)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port:${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()