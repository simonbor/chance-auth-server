'use strict';
const connect = require('../../connect');

const insert = async function(user, role) {

    let userData = await connect.query('INSERT INTO user (name,email,user_pass) VALUES (?,?,?)', role, user.Email, cipher.encode(user.Password), user.Name, user.MobileNum);
    const res = new User((userData[0])[0] || {});

    return res;
}

module.exports = { insert }