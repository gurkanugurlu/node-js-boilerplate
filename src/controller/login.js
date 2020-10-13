const User = require('../models/User')

const login = async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findByCredentials(email, password)

  const token=  await user.generateAuthToken()
    return res.send({token})
  } catch (err) {
    return res.status(400).send(err)
  }
}

module.exports = {
  login,
}
