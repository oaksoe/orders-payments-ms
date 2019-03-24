var amqp = require('amqplib').connect('amqp://localhost');

exports.publish = (queue, message) => {
    amqp.then(connection => {
        return connection.createChannel();
    }).then(channel => {
        return channel.assertQueue(queue).then(ok => {
            console.log('AMQP queue asserted');
            return channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        });
    }).catch(console.warn);
}

exports.consume = (queue, cb) => {
    amqp.then(connection => {
        return connection.createChannel();
    }).then(channel => {
        return channel.assertQueue(queue).then(ok => {
            return channel.consume(queue, message => {
                if (message !== null) {
                    var content = JSON.parse(message.content.toString());
                    console.log('AMQP received message: ', content);
                    channel.ack(message);
                    cb(content);
                }
            });
        });
    }).catch(console.warn);
}
