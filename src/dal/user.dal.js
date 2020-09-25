'use strict';
const DbContext = require('../contexts/db-context/db-context');
const cipher = require('../cipher');
const { User } = require('../models/user');

const insert = async function(user, role) {
    const dbContext = new DbContext();

    let userData = await dbContext.query(`
        insert into auth."User" ("RoleId", "Email", "Password", "FirstName", "MobileNum") 
        values ($1,$2,$3,$4,$5) 
        returning *;`, 
    [ role, user.Email, cipher.encrypt(user.Password), user.FirstName, user.MobileNum ]);

    const res = new User(userData || {});
    return res;
}

module.exports = { insert }