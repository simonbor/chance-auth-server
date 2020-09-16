'use strict'
const https = require('https');
const config = require('../../config');
const cipher = require('../../cipher');

module.exports = class HmClient {
    getLocation(searchText) {
        const url = `${config.here_map.geo_url}?apiKey=${cipher.decrypt(config.here_map.api_key)}&searchtext=${searchText}`;

        return new Promise(resolve => {
            https.get(url, res => {
                res.setEncoding("utf8");
                let body = "";
                res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    const data = JSON.parse(body);
                    resolve(data.Response.View[0].Result[0].Location.DisplayPosition);
                });
                res.on("error", (err) => {
                    console.error(err);
                });
            });
        });
    }
}
