const mongoose = require('mongoose')
const { COMMON_CONSTANTS } = require('../constants/index')

mongoose.connect(COMMON_CONSTANTS.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
  console.log('iam connected')
})
