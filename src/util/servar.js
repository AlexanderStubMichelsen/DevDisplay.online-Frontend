const express = require('express');
const session = require('express-session');
const passport = require('passport');
const UnsplashStrategy = require('passport-unsplash').Strategy;

const app = express();

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new UnsplashStrategy({
    clientID: 'YOUR_UNSPLASH_ACCESS_KEY',
    clientSecret: 'YOUR_UNSPLASH_SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/unsplash/callback'
}, function(accessToken, refreshToken, profile, done) {
    // Save the user's profile information in the session
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.get('/auth/unsplash', passport.authenticate('unsplash'));

app.get('/auth/unsplash/callback',
    passport.authenticate('unsplash', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.username}`);
    } else {
        res.send('Hello Guest. Please <a href="/auth/unsplash">Login with Unsplash</a>');
    }
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});