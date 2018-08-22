const mongoose = require('mongoose')
const { mongoURI } = require('../config/keys')
mongoose.Promise = global.Promise

mongoose.connect(mongoURI).then()

module.exports = {
  mongoose
}
