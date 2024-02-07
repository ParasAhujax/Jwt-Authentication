const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const { connectToMongoDb } = require('./connect');
connectToMongoDb("mongodb://127.0.0.1:27017/authentication")
.then(console.log("connected to mongoDb"))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const userRoute = require('./routes/userRoute');
const staticRoute = require('./routes/staticRoute');
const {checkAuth} = require('./middleware/checkAuth');

app.use('/user',userRoute)
app.use('/',checkAuth,staticRoute);

app.listen(3000,()=> {
    console.log("running on 3000")
})