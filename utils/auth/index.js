const passport = require('passport');

const LocalStrategy = require('./strategy/local.strategy');
const JWTStrategy = require('./strategy/jwt.strategy');

passport.use(LocalStrategy);
passport.use(JWTStrategy);
