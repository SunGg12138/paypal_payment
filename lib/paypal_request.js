var request = require('request');

var main = {
    getAccessToken: function(client_id, secret){
        return new Promise((resolve, reject) => {
            request.post({
                url: 'https://' + client_id + ':' + secret + '@api.sandbox.paypal.com/v1/oauth2/token?grant_type=client_credentials',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                    'accept-language': 'en_US'
                },
                form: {
                    grant_type: 'client_credentials'
                },
                json: true
            }, function(err, res, body){
                if (err) return reject(err);
                resolve(body);
            });
        });
    },
    findPaymentById: function(access_token, id){
        return new Promise((resolve, reject) => {
            request({
                url: 'https://api.sandbox.paypal.com/v1/payments/payment/' + id,
                headers: {
                    "authorization": 'Bearer ' + access_token
                },
                json: true
            }, function(err, res, body){
                if (err) return reject(err);
                resolve(body);
            });
        });
    }
};

module.exports = main;