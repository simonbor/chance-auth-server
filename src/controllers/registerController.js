'use strict';
const userDal = require('../dal/userDal');

const register = function(req, res) {
    const user = userDal.insert(req.body.User, role.User);
    req.body.User.UserId = user.UserId;
    user = userDal.get(req.body.User);

    let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400});
    
    res.statusCode(200);
    return { auth: true, token: token, user: user };
}

module.exports = { register }