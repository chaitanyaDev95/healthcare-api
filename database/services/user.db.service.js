const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const Auth = require('../../middelware/auth')
// Create and Save a new User
exports.registerUser = async data => {
  try {
    data.password = bcrypt.hashSync(data.password, 10)
    let newUser = new User(data)
    newUser = await newUser.save()
    if (!newUser) {
      return false
    } else {
      delete newUser._doc.password
      return newUser
    }
  } catch (error) {
    return false
  }
}

// Retrieve one user from the database.
exports.findOneUser = async (key) => {
  const user = await User.findOne(key).select('-password')
  return user
}

// login user with an email id
exports.loginUser = async data => {
  try {
    const user = await User.findOne({userEmail: data.userEmail })
    if (!user) {
      return false
    } else if (bcrypt.compareSync(data.password, user.password)) {
      const token = await Auth.generateLoginToken(user.userEmail)
      if (!token) { return false }
      delete user._doc.password
      user._doc['token'] = token
      return user
    }
  } catch (error) {
    return error
  }
}

