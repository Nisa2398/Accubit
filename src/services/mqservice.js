var amqp = require('amqplib');
const CONN_URL = 'amqps://jeumzmmn:KBKEiyk2nntzbSGyekXaJCrg7toKVv5R@fish.rmq.cloudamqp.com/jeumzmmn';
// let ch = null;
var open = require('amqplib').connect(CONN_URL);

exports.publishToQueue = async (queueName, data) => {
    return open.then(function(conn) {
        return conn.createChannel();
      }).then(function(ch) {
        return ch.assertQueue(queueName).then(function(ok) {
            console.log(queueName)
          return ch.sendToQueue(queueName, Buffer.from(data));
        });
      }).catch(console.warn);
      
}
exports.consume = async (queueName)=>{
    var message=[]
     await open.then(async function(conn) {
        return await conn.createChannel();
      }).then(async function(ch) {
        return await ch.assertQueue(queueName).then(async function(ok) {
            ch.prefetch(10)
          return await ch.consume(queueName, function(msg) {
              message.push(msg.content.toString())
              
            // console.log(" [x] Received %s", msg.content.toString());
          }, {
              noAck: true
            })
        });
    })  
    // console.log(message)
    return message 
}
process.on('exit', (code) => {
   ch.close();
   console.log(`Closing rabbitmq channel`);
});
