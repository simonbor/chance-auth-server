'use strict'
const config = require('../../config');
var fs = require("fs");

module.exports = class MockClient {
    getLocation(searchText) {
        const mock = config.here_map.geo_url;

        return new Promise(resolve => {
            fs.readFile(process.cwd() + mock, function(err, body) {
                if(err) {
                    resolve(null, err.msg);
                } else {
                    const data = JSON.parse(body);
                    resolve(data.Response.View[0].Result[0].Location.DisplayPosition);
                }
            })
        });
    }
}
