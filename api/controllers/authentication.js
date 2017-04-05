var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports.login = function (req, res) {

    console.log('Login user.');
    passport.authenticate('local', function (err, user, info) {
        var token;
        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
};

module.exports.register = function (req, res) {
    console.log('Register user.');
    var user = new User();
    console.log('User credentials.');
    user.name = req.body.name;
    user.email = req.body.email;
    console.log(`name = ${req.body.name}`);
    console.log(req.body.email);
    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        token = user.generateJwt();
        console.log(token);
        res.status(200);
        res.json({
            "token": token
        });
    });
};