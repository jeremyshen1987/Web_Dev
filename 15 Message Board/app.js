const dotenv = require('dotenv').config()

const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')

const User = require('./model/user-model')
const Router = require('./route/route')


const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");

passport.use(

  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {

      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      if( !bcrypt.compareSync(password, user.password) ){

        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    });
  })
);
  
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});



app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(Router)



app.post("/signup", async (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    })
    
    user.password = await bcrypt.hash(req.body.password, 10)
    
    user.save(err => {
      if (err) { 
        return next(err);
      }
      res.redirect("/");
    });

});


app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success",
      failureRedirect: "/"
    })
);

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("app listening on port 3000!"));
