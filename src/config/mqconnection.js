var amqp = require('amqplib');
const CONN_URL = 'amqps://jeumzmmn:KBKEiyk2nntzbSGyekXaJCrg7toKVv5R@fish.rmq.cloudamqp.com/jeumzmmn';
let ch = null;
amqp.connect(CONN_URL, function (err, conn) {
    console.log(err)
   conn.createChannel(function (err, channel) {
       console.log(err)
       console.log(channel,'ch')
      ch = channel;
   });
});

module.exports =ch