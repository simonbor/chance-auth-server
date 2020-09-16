'use strict';
const DbContext = require('./dal-context/dbContext');
const { Street, GetAllStreetsReq } = require('./../models/street');

const streetGetAll = async function(address) {
    const dbContext = new DbContext();

    const req = new GetAllStreetsReq(address);
    let streetsData = await dbContext.execute('main."sp_GetAllStreets"', req);

    // console.log(streetsData[0].length);

    const res = streetsData[0].map(street => new Street(street));

    return res;
}

module.exports = { streetGetAll }