const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = mongoose.model('users');
const { forwardAuthenticated } = require('../config/auth');

module.exports = (app) => {

    // @route POST api/users/register
    // @desc Register user
    // @access Public
    app.post("/api/users/register", (req, res) => {
        // Form validation
        const { errors, isValid } = validateRegisterInput(req.body); // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        User.find({ $or: [{email: req.body.email}, {username: req.body.username}]} ).then(match => {
            if (match.length > 0) {
                var ret = {};
                match.forEach(elem => {
                    if (elem.email == req.body.email){
                        ret.email = "Email already exists";
                    }
                    if (elem.username == req.body.username){
                        ret.username = "Username already exists";
                    }
                });
                return res.status(400).json(ret);
            }
            else {
                const newUser = new User({
                    name: req.body.name,
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                    });
                });
            }
        }); 
    });

    // @route POST api/users/login
    // @desc Login user and return JWT token
    // @access Public
    app.post("/api/users/login", (req, res) => {
        // Form validation
        const { errors, isValid } = validateLoginInput(req.body);// Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        
        const email = req.body.email;
        const password = req.body.password;
        // Find user by email or username
        User.findOne({ $or: [{email: email}, {username: email}]}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email or Username not found" });
        }
        
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
                id: user.id,
                username: user.username,
                name: user.name
            };
            
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                res.json({
                    success: true,
                    token: token
                });
                }
            );
            
            } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
        });
        });
    });


    app.use('/api/users/', function(req, res, next) {
      var token = req.get("Authorization");
      if (!token) next({ auth: false, message: 'No token provided.' });
      
      jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err) next(err);
        
        req.user = decoded;
        next();
      });
    });

    // list all friend requests form user
    app.get('/api/users/requests', async (req, res) =>{
      const userID = req.user.id;
      User.findById({_id : userID}).populate('requests').then(user => {
        return res.status(200).json(user.requests);
      }).catch(function(err) {
        return res.json(err);
      });
    });

    //list user's friends
    app.get('/api/users/friends', async (req, res) =>{
      const userID = req.user.id;
      User.findById({userID}).then(user => {
        return res.status(200).json(user.friends);
      })
      .catch(function(err) {
        return res.json(err);
      });
    });

    // send a friend request to another user
    app.post('/api/users/send-request/:user2', async (req, res) => {
      const userID = req.user.id;
      const {user2} = req.params;
      User.findById({_id: user2}).then(user => {
        user.requests.push(userID);
        user.save();
        return res.status(200).json({success: true});
      })
      .catch(function(err) {
        return res.json(err);
      });
    });

    // remove friend request from user
    app.post('api/users/deny-request/:requestID', async (req, res) => {
      const userID = req.user.id;
      const {requestID} = req.params;
      User.findById({userID}).then(user => {
        user.requests = user.requests.filter(id => {id == requestID});
        user.save();
        return res.status(200).json({success: true});
      })
      .catch(function(err) {
        return res.json(err);
      });
    });

    // remove friend request and add to friends list
    app.post('/api/users/accept-request/:requestID', async (req, res) => {
      const userID = req.user.id;
      const {requestID} = req.params;

      User.findById({_id : requestID}).then(user2 =>{
        user2.friends.push(userID);
        user2.save();
        User.findById({_id : userID}).then(user => {
          user.friends.push(requestID);
          user.requests = user.requests.filter(id => {id == requestID});
          user.save();
          return res.status(200).json({success: true});
        })
        .catch(function(err) {
          return res.json(err);
        });
      })
      .catch(function(err) {
        return res.json(err);
      });
    });

}