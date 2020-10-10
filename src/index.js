// starting express
const express = require('express')
// starting db
require('./db/index')
const { COMMON_CONSTANTS } = require('./constants')

const { PORT } = COMMON_CONSTANTS

// routers

const userRouter = require('./routers/user')

// setting express
const app = express()

// setting JSON parser
app.use(express.json())

app.use(userRouter)

// starting express
app.listen(PORT, (error, result) => {
    if (error) {
        return console.log('Server is not starting', error)
    }
    console.log(`Server is up on ${PORT}`)
})
