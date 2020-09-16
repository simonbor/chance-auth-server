'use strict';
const connect = require('../../connect');
const mssql = require('mssql');

module.exports = class MssqlContext {
    async execute(procedureName, reqParams) {
        const pool = await connect.getPool('mssql');
        let request = await pool.request();

        for (const param in reqParams) {
            const typeName = reqParams[param]["typeName"];
            const typeLength = reqParams[param]["typeLength"] || 0;
            const value = reqParams[param]["value"];

            request.input(param, mssql[typeName](typeLength), value);
        }

        let data = await request.execute(procedureName);

        // console.log(procedureName);
        // console.log(data);

        return data.recordsets;
    }
}