var amqp = require('apps-lib/amqp');

amqp.consume('processPayment', message => {
    console.log('amqp: payment process requested!', message);
    if (authenticate(message.token)) {
        processPayment(message.order);
    } else {
        declineOrder(message.order.id, 'auth failed.');
    }
});

var authenticate = (token) => {
    // Call auth service to authenticate the token
    console.log(token);
    return true;
}

var isValidOrder = (order) => {
    // Order validation logic here
    return true;
}

var processPayment = (order) => {
    if (isValidOrder(order)) {
        // Payment processing logic here
        confirmOrder(order.id);
    } else {
        declineOrder(order.id, 'order validation failed.');
    }
}

var confirmOrder = (orderID) => {    
    amqp.publish('orderConfirmed', {
        orderID: orderID
    });
}

var declineOrder = (orderID, reason) => {
    amqp.publish('orderDeclined', {
        orderID: orderID,
        reason: reason
    });
}
