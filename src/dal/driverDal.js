'use strict';
const DbContext = require('./dal-context/dbContext');
const { Driver, GetDriverReq, InsertDriverReq, UpdateReportDriverReq } = require('./../models/driver');

const driverGet = async function(driver) {
    const dbContext = new DbContext();

    const driverReq = new GetDriverReq(driver);
    let driverData = await dbContext.execute('main."sp_GetDriver"', driverReq);
    const res = new Driver((driverData[0])[0] || {});

    return res;
}

const driverInsert = async function(driver) {
    const dbContext = new DbContext();

    const driverReq = new InsertDriverReq(driver);
    let driverData = await dbContext.execute('main."sp_InsertDriver"', driverReq);
    const res = new Driver((driverData[0])[0]);

    return res;
}

const updateReports = async function(driver) {
    const dbContext = new DbContext();

    const driverReq = new UpdateReportDriverReq(driver);
    let driverData = await dbContext.execute('main."sp_UpdateReports"', driverReq);
    const res = new Driver((driverData[0])[0]);

    return res;
}

module.exports = {driverGet, driverInsert, updateReports}