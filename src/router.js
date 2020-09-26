const url = require('url');
const { parse } = require('querystring');
const authController = require('./controllers/auth.controller')

function collectRequestDataAsync(request) {    
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    let body = '';

    return new Promise(resolve => {
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            if(request.headers['content-type'].toLowerCase() === FORM_URLENCODED) {
                resolve(parse(body));
            } else {
                resolve(JSON.parse(body));
            }
        });
    });
}

const route = async function(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (req.method === 'POST') {
        req.body = await collectRequestDataAsync(req);
    }

    if (reqUrl.pathname == '/register' && req.method === 'POST') {
        return await authController.register(req, res);
    }

    if (reqUrl.pathname == '/login' && req.method === 'POST') {
        return await authController.login(req, res);

    } else {
        res.statusCode = 404;
        return '{}';
    }
}

module.exports = { route }