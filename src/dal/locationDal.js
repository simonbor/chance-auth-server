'use strict';
const DbContext = require('./dal-context/dbContext');
const { Location, GetLocationByAddressReq, InsertLocationReq } = require('../models/location');

const locationGet = async function(address) {
    const dbContext = new DbContext();
    
    const req = new GetLocationByAddressReq(address)
    const locationData = await dbContext.execute('main."sp_GetLocationByAddress"', req);
    const location = new Location(locationData[0][0] || locationData[0]);

    return location;
}

const locationInsert = async function(locationReq) {  
    const dbContext = new DbContext();

    const insertLocationReq = new InsertLocationReq(locationReq)
    const locationData = await dbContext.execute('main."sp_InsertLocation"', insertLocationReq);
    const location = new Location((locationData[0])[0]);

    return location;
}

module.exports = { locationGet, locationInsert }