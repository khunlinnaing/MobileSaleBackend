const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./dbconnection/dbconnect')


const UserRoute = require('./routes/user_routes')
const CategoryRoute = require('./routes/category_routes')
const ProductRoute = require('./routes/products_routes')

const app = express()
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

app.use('/api/user', UserRoute);
app.use('/api/category', CategoryRoute);
app.use('/api/products',ProductRoute);

mongoose.connect(
    db
).then(() => app.listen(5000))
.then(() => {
    console.log("Connected To Database and Listening To localhost 500")
})
.catch((error) =>{
    console.log(error.message)
});