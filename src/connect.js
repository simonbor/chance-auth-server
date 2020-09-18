const mssql = require('mssql');
const cipher = require('./cipher');
const config = require('./config');
const { Pool } = require('pg');

// todo: after complete postgres integration don't forget to remove default db value
const getPool = async function(db) {
    let pool;
    const dbConfig = JSON.parse(JSON.stringify(config[`${db}-config`]));    
    dbConfig.password = cipher.decrypt(dbConfig.password);

    (db === 'mssql') && (pool = await mssql.connect(dbConfig));
    (db === 'psql') && (pool = new Pool(dbConfig));

    return pool;
}

module.exports = {getPool}