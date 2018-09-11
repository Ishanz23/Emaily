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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        return done(null, existingUser)
      }
      const newUser = await new User({
        googleId: profile.id,
        displayName: profile.displayName
      }).save()
      done(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) =>
  User.findById(id).then(user => done(null, user))
)
