const passport = require('passport')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const { googleClientID, googleClientSecret } = require('../config/keys')

const User = mongoose.model('users')

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(user => {
        if (!user) {
          new User({
            googleId: profile.id,
            displayName: profile.displayName
          })
            .save()
            .then(user => done(null, user))
        } else {
          done(null, user)
        }
      })
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
)

