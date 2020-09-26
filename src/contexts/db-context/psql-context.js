'use strict';
const connect = require('../../connect');

module.exports = class PsqlContext {
    async query(sql, values) {
        const pool = await connect.getPool('psql');

        let res;
        try {
            res = await pool.query(sql, values);
        } catch (err) {
            process.env.NODE_ENV && process.env.NODE_ENV != 'test' &&
            console.error(`Error: ${err.message}`);

            pool.end();
            return;
        }

        pool.end();
        return res.rows[0];
    }

    async execute(procedureName, request) {
        const pool = await connect.getPool('psql');

        let csPayload = '';
        const arrParams = Object.values(request).map(item => {return item.value || null});

        arrParams.map((item, index) => {
            csPayload += `$${index + 1}, `;
        })
        const csDollars = csPayload.trim().slice(0, -1)

        // console.log(arrParams);
        // console.log(procedureName);

        let data = [], res;
        try {
            res = await pool.query(`select row_to_json(${procedureName}(${csDollars}))`, arrParams);
            res.rows.map(row => { row && data.push(row['row_to_json']) });
        } catch (err) {
            console.error(`Error: ${err.message}`);
        }

        pool.end();
        return [data];
    }
}