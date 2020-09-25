'use strict';
const tokenAuth = require('../token-auth');
const userDal = require('../dal/user.dal');
const { roles } = require('../enums');

const register = async function(req, res) {
    const user = await userDal.insert(req.body.User, roles.User);
    const token = tokenAuth.sign(user, 60 * 5);
    const {Password, Created, Updated, ...UserRestFields} = user;

    res.statusCode = 200;
    return { 
        auth: true, 
        token: token, 
        user: UserRestFields
    };
}

module.exports = { register }
