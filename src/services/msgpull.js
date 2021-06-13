var amqp = require('amqplib');
amqp.connect(`amqps://jeumzmmn:KBKEiyk2nntzbSGyekXaJCrg7toKVv5R@fish.rmq.cloudamqp.com/jeumzmmn`, function (error0, connection) {
    if (error0) {
        throw error0
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'task_queue1';
        channel.assertQueue(queue, {
            durable: true
        });
        channel.prefetch(10)
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", 
            msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
                channel.ack(msg);
            }, 7000);

        }, {
            noAck: false
        });
    });
});
