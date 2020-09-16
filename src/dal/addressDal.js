'use strict';
const DbContext = require('./dal-context/dbContext');
const { Address, GetAddressReq, InsertAddressReq } = require('../models/address');

const addressGet = async function(req) {
    const dbContext = new DbContext();

    const addressReq = new GetAddressReq(req)
    const addressRes = await dbContext.execute('main."sp_GetAddress"', addressReq);
    const address = new Address((addressRes[0])[0] || {});

    return address;
}

const addressInsert = async function(req) {
    const dbContext = new DbContext();

    const addressReq = new InsertAddressReq(req);
    const addressRes = await dbContext.execute('main."sp_InsertAddress"', addressReq);
    const address = new Address((addressRes[0])[0]);

    return address;
}

module.exports = { addressGet, addressInsert }