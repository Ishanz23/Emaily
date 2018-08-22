const express = require('express')
const cookieSession = require('cookie-session')
const passport = require('passport')

const { cookieKey } = require('./config/keys')
const { mongoose } = require('./db/db')
require('./models/User')
require('./services/passport')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [cookieKey] }))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

app.listen(PORT, () => console.log(`Magic happens at port ${PORT}`))
