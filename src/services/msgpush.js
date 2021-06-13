var amqp = require('amqplib');
amqp.connect(`amqps://jeumzmmn:KBKEiyk2nntzbSGyekXaJCrg7toKVv5R@fish.rmq.cloudamqp.com/jeumzmmn`, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createConfirmChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(queue, {
            durable: true
        });
        var queue = 'task_queue1';
        for (i = 0; i < 20; i++)
            channel.sendToQueue(queue, Buffer.from(i.toString()),{
                persistent: true
            }, (err, ok) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(ok)
                }
            });
        console.log(" [x] Sent %s", msg);
    });
});
