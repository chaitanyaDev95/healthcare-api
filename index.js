const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const dotenv = require('dotenv');
dotenv.config();

process.on('uncaughtException', function (err) {
    console.log(err);
})
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/", (req, res) => {
    console.log("welcome to Health API");
    return res.status(200).json({ "message": "Health API" })

})
require('./config/db')
// mount the router on the app 
app.use('/api', require('./routes/router')); 
module.exports = app;
app.listen(port,() => {
    console.log(`server is live at this port no `,port);
})



