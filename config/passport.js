const fs = require('fs');
const path = require('path');
const passport = require('passport');
var SamlStrategy = require('passport-saml').Strategy;

const User = require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(err, user);
});

const SamlStrategyMiddleware = new SamlStrategy({
    issuer: process.env.SAML_ISSUER,
    path: '/api/saml/acs',
    entryPoint: process.env.SAML_ENTRYPOINT,
    cert: fs.readFileSync(path.join(__dirname, "./saml-cert.pem"), "utf8"),
},
function(profile, done) {
    console.log('Succesfully Profile' + JSON.stringify(profile));
    if (!profile.email) {
        return done(new Error("No email found"), null);
    }
    process.nextTick(function() {
        console.log('process.nextTick' + profile);
        try {
            const user = await User.findOne({
                email: email,
            });
            if (!user) {
                const newUser = new User({
                    email
                });
                await newUser.save();
                done(null, newUser);
            }
            done(null, user);
        } catch (err) {
            done(err);
        }
        done(null, profile);
    });
})

passport.use(SamlStrategyMiddleware);

passport.protected = function protected(req, res, next) {
    console.log('Login Profile' + req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('login please' + req.isAuthenticated());
    res.redirect('/saml/login');
};

module.exports = { passport, SamlStrategyMiddleware };