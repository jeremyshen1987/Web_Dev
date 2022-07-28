const express = require('express')
const router = express.Router()

router.get("/", (req, res) => res.render("index", {user: req.user}));
router.get("/login", (req, res) => res.render("login", {user: req.user}));
router.get('/success', (req, res) => res.send('login successful'))
router.get('/signup', (req, res) => {
  res.render('signup')
})

module.exports = router