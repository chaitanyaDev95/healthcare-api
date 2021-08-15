const userDbService = require('../database/services/user.db.service')
exports.createUser = async (req, res) => {
  try {
    const isUserEmailExist = await userDbService.findOneUser({
      userEmail: req.body.userEmail
    })
    if (isUserEmailExist) {
      return res.status(400).json({
        status: false,
        message: 'User email already exist!'
      })
    }
    // Create a User
    const user = {
      userEmail: req.body.userEmail,
      userName: req.body.userName,
      password: req.body.password
    }
    const newuser = await userDbService.registerUser(user)
    if (!newuser) {
      return res.status(400).json({
        status: false,
        message: 'user register failed!'
      })
    }
    return res.status(200).json({
      status: true,
      message: 'user registered successfully',
      data: newuser
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'exception occurred at user register',
      error: error.toString()
    })
  }
}

exports.login = async (req, res) => {
  try {
    const user = {
      userEmail: req.body.username,
      password: req.body.password
    }
    const userLogin = await userDbService.loginUser(user)
    if (!userLogin) {
      return res.status(400).json({
        status: false,
        message: 'email or password incorrect!'
      })
    }
    return res.status(200).json({
      status: true,
      message: 'login successful',
      data: userLogin
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'exception occured at login' })
  }
}

exports.getPatientHealthInfo = async (req, res) => {
  try {
    const healthData = {
      "Timestamp": "2021-08-15 14:40:20",
      "Personalinfo": {
        "Name": "John Doe",
        "Email": "john.doe@gmail.com",
        "Phone": "9876543210",
        "Age": "25 years"
      },
      "MedicalCondition": {
        "HeartDisease": false,
        "Diabetics": true,
        "BloodPressure": {
          "HighBP": true,
          "LowBP": false
        }
      },
      "HealthStatus": {
        "Height": "175 cms",
        "Weight": "65 kg",
        "PulseRate": "88 bpm",
        "BP": "120/160",
        "BMI": 25
      }
    }

    if (!healthData) {
      return res.status(200).json({
        status: true,
        code: 204,
        message: 'Patient health data not found!'
      })
    }
    return res.status(200).json({
      status: true,
      message: 'Patient health data get successfully',
      data: healthData
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'exception occured at getPatientHealthInfo',error })
  }
}
