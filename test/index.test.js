var secret = '<Your secret>';
var client_id = '<Your client_id>';
var PAY_id = '< A paypal payment id>';

var expect = require('chai').expect;
var paypal_payment = require('../index');

describe('paypal_payment test', function(){

    before(function(){
        // set account's client_id and secret
        paypal_payment.setAccount(client_id, secret);
    });

    it('Get payment should return payment, at normal', function(done){
        paypal_payment.find(PAY_id).then(function(result){
            expect(result.id === PAY_id).to.be.ok;
            done();
        }, function(err){
            throw err;
        });
    });

    it('Get payment should return payment, at account_token invalid', function(done){
        paypal_payment.access_token = '1234567890';
        paypal_payment.access_token_valid_till = new Date('3000-01-01');
        paypal_payment.find(PAY_id).then(function(result){
            expect(result.id === PAY_id).to.be.ok;
            done();
        }, function(err){
            throw err;
        });
    });

    it('Get payment should return payment, at account_token expire', function(done){
        paypal_payment.access_token_valid_till = new Date('2000-01-01');
        paypal_payment.find(PAY_id).then(function(result){
            expect(result.id === PAY_id).to.be.ok;
            done();
        }, function(err){
            throw err;
        });
    });
});
