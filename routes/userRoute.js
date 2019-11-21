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
                        newUser
                        .save()
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

}