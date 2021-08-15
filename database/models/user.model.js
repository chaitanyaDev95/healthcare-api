const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        trim: true

    },
    userEmail: {
        type: String,
        required: true,
        lowercase: true,
        unique: false,
        trim: true

    },
    password: {
        type: String,
        required: true,
        trim: true

    }
})
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.hash_password);
};
module.exports = new mongoose.model("users", UserSchema)






