const session = require('express-session')
const bodyParser = require('body-parser');
const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require("dotenv").config();
const app = express()

// Connect to Database
connectDB();

app.use(express.json({extended:false}));
 
app.use(cors())

// Define Routes

app.use('/access',require('./routes/login'));
app.use('/view',require('./routes/invoicedetails'))
app.use('/getdata',require('./routes/dashboardData'))
app.use('/getuser',require('./routes/userData'))


const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})        