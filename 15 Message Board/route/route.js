const express = require('express')
const router = express.Router()

const message_model = require('../model/message-model')



router.get("/", (req, res) => {

  message_model.find({}, (err, data) => {


    if(err){
      res.send('Error while retrieving messages')
    }

    res.render("index", {msg: data, user: req.user})

  }).select({_id: 0, __v: 0})
  
});

router.get("/login", (req, res) => res.render("login", {user: req.user}));

router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get('/success', (req, res) => res.send('login successful'))
router.get('/signup', (req, res) => res.render('signup'))
router.get('/new', (req, res) => {

  console.log(req.user.username)
  res.render('new', {user: req.user})
})

module.exports = router