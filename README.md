# To verify paypal payment

Get paypal payment by payment id.

## Use npm
```
$ npm install paypal_payment
```

## How to use

```javascript
var paypal_payment = require('paypal_payment');

// set once
paypal_payment.setAccount(client_id, secret);

paypal_payment.find(PAY_id).then(function(result){
    // result is payment
}, function(err){
    throw err;
});

```

## Test

Set your account information at test/index.test.js file.

```javascript
var secret = '<Your secret>';
var client_id = '<Your client_id>';
var PAY_id = '< A paypal payment id>';

```

run:

```
$ npm test
```