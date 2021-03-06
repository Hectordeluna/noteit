const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require("passport");

require('./models/note');
require('./models/user');
require('./models/comment');

const app = express();

require('./config/passport')(passport);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/NOTEIT_DB`);

app.use(bodyParser.json());
// Passport middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// IMPORT ROUTE
require('./routes/noteRoute')(app);
require('./routes/userRoute')(app);
require('./routes/commentRoute')(app);
require('./routes/searchRoute')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('noteit/build'));
  
    const path = require('path');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'noteit', 'build', 'index.html'))
    })
  
  }
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});