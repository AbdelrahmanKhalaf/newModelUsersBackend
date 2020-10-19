const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const fakeData = require('./routes/faker')
const bodyParser = require('body-parser')
const search = require('./routes/search')
mongoose.connect('mongodb://127.0.0.1/arbica-coffee', { useUnifiedTopology: true })
    .then(() => console.log('conected to DB server...'))
    .catch(err => console.error('filed connected to DB server...'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.set('view engine', 'html');
app.use('/api/user', users);
app.use('/api/fake', fakeData);
app.use('/api/search', search);
app.use("/uploads",express.static('uploads'))
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Listing on port ${PORT}....`));




