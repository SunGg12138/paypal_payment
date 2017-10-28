var co = require('co');
var paypal_request = require('./lib/paypal_request');

var paypal_payment = {
    secret: null,
    client_id: null,
    setAccount: function(client_id, secret){
        paypal_payment.secret = secret;
        paypal_payment.client_id = client_id;
    },

    access_token: null,
    access_token_valid_till: null,
    updateAccessToken: function(){
        return co(function* (){
            var body = yield paypal_request.getAccessToken(paypal_payment.client_id, paypal_payment.secret);
            if (body.error) {
                return Promise.reject(body);
            }
            paypal_payment.access_token = body.access_token;
            paypal_payment.access_token_valid_till = new Date() + body.expires_in;
        });
    },
    
    find: function(PAY_id){
        return co(function* (){
            if (!paypal_payment.access_token || new Date() > paypal_payment.access_token_valid_till) {
                yield paypal_payment.updateAccessToken();
            }
            var result = yield paypal_request.findPaymentById(paypal_payment.access_token, PAY_id);
            if (result.error && result.error === 'invalid_token') {
                yield paypal_payment.updateAccessToken();
                return paypal_request.findPaymentById(paypal_payment.access_token, PAY_id);
            } else if (result.error) {
                return Promise.reject(result);
            }
            return Promise.resolve(result);
        });
    }
};



module.exports = paypal_payment;