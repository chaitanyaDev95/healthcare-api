const mongoose = require("mongoose");
const {MONGODB_URL} =process.env
mongoose.connect(MONGODB_URL, {
    useCreateIndex:true,
    useNewUrlParser:true.valueOf,
    useUnifiedTopology:true
}).then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log("No connection");
})