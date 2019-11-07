var express = require("express");
var router = express.Router();
var User = require('../db/models/User')
var passport = require("../server/passport")

router.post('/register', (req, res)=>{
    User.create(req.body)
    .then(user => res.status(201).send(user))
})

router.post('/login', passport.authenticate('local'), (req, res)=>{
    res.send(req.user)
})

router.get('/logout', (req, res)=>{
    req.logout()
    res.send('logged Out!')
})

router.get('/me', (req, res) =>{
    res.send(req.user)
})



module.exports = router