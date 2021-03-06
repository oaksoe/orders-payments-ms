var amqp = require('apps-lib/amqp');
var dbEntityController = require('../controllers/dbEntityController');
var constants = require('../helpers/constants');
var dummyAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

exports.init = () => {
    amqp.consume('orderCreated', newOrder => {
        console.log('amqp: order created!', newOrder);

        amqp.publish('processPayment', {
            token: dummyAuthToken,
            order: newOrder
        });
    });

    amqp.consume('orderConfirmed', async(message) => {
        var orderID = message.orderID;
        console.log('amqp: order confirmed! Order ID: ', orderID);
        await updateOrderStatus(orderID, constants.ORDER_STATUS.CONFIRMED);
        setTimeout(async () => {
            await updateOrderStatus(orderID, constants.ORDER_STATUS.DELIVERED);
            console.log('order delivered');
        }, 3000);
    });

    amqp.consume('orderDeclined', async(message) => {
        console.log('amqp: order declined! reason: ', message.reason);
        await updateOrderStatus(message.orderID, constants.ORDER_STATUS.CANCELLED);
    });
}

var updateOrderStatus = async (id, status) => {
    await dbEntityController.update('order', { _status: status }, { id: id });
}
