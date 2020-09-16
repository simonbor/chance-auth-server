'use strict';
const MssqlContext = require('./mssqlContext');
const PsqlContext = require('./psqlContext');
const config = require('../../config');

// Dependency Injection approach inspired from the article -
// https://medium.com/javascript-in-plain-english/does-dependency-injection-have-a-place-in-javascript-37831c204a0b
module.exports = class DbContext {
    static initContext() {
        const mssqlContext = new MssqlContext();
        const psqlContext = new PsqlContext();
        const dbInUse = config["db-in-use"];

        (dbInUse === 'mssql') && (DbContext.prototype.execute = mssqlContext.execute);
        (dbInUse === 'psql') && (DbContext.prototype.execute = psqlContext.execute);
    }
    
    execute(procedureName, reqParams) {
        // always overridden by derived classes at app start - DbContext.initContext()
        throw new Error('use DbContext.initContext() at app start');
    }
}