var amqp = require('amqplib');
const CONN_URL = 'amqps://jeumzmmn:KBKEiyk2nntzbSGyekXaJCrg7toKVv5R@fish.rmq.cloudamqp.com/jeumzmmn';
amqp.connect(CONN_URL, function (err, conn) {
  conn.createChannel(function (err, ch) {
    ch.consume('sendmail', function (msg) {
      console.log('.....');
      setTimeout(function(){
        console.log("Message:", msg.content.toString());
      },4000);
      },{ noAck: true }
    );
  });
});