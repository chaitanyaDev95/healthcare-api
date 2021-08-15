const jwt = require('jsonwebtoken')
const JwtSecret = process.env.JWT_SECRET_KEY
exports.generateLoginToken = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await jwt.sign({ userEmail: userEmail }, JwtSecret, { expiresIn: 86400 })
            resolve(token);
        } catch (error) {
            reject(error)
        }
    })

}

exports.isAuth = async (req, res, next) => {
    try {
        if (typeof req.header("Authorization") !== "undefined") {
            const bearer = req.header("Authorization");
            const decoded = await jwt.verify(bearer, JwtSecret);
            if (!decoded) {
                return res.status(401).json({ "status": false, "message": "Un-authorized! Malformed authentication header!!" });
            }
            next();
        } else {
            return res.status(401).json({ "status": false, "message": "Missing Authorization!!" });
        }

    } catch (error) {
        return res.status(401).json({ "status": false, "message": "Missing Authorization!!",error:error });
    }

}





