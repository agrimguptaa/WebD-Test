const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function (passport) {

    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false);

        return done(null, user);
    }));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};
