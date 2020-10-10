const User = require('../models/User')

const login = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findByCredentials(email, password)
    return res.send(user)
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports = {
  login,
}
