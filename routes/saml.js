const express = require("express");
const { passport, SamlStrategyMiddleware } = require('../config/passport');


const router = express.Router();

router.get('/login/error', (req, res) => {
    res.status(400).json({ message: 'Invalid Credentials' });
});

// For SP Initiated Flow
router.get("/login", 
    passport.authenticate("saml", { failureRedirect: "/api/saml/login/error" }), 
    (req, res) => {
        res
          .status(200)
          .json({ 
              message: 'Login Successfully',
              token: req.user.email,
              user: req.user
            });
    }
);

// For IdP Initiated Flow
router.post('/acs', 
    passport.authenticate("saml", { failureRedirect: '/api/saml/login/error', failureFlash: true, successRedirect: '/' }), 
    (req, res) => {
        res
          .status(200)
          .json({ 
              message: 'Login Successfully',
              token: req.user.email,
              user: req.user
            });
    }
);

router.get('/metadata', () => {
    console.log(SamlStrategyMiddleware.generateServiceProviderMetadata());
    res.send(200);
});

module.exports = router;