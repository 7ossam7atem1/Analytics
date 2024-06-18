const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./db/db.js');
const Event = require('./models/event.js');

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been stublished Successfully');
  } catch (error) {
    console.log('Unable to connect to database', error);
  }
};

connectToDB().then(() => {
  console.log('Connect to DataBase Successfully!');
});
amqp.connect(
  process.env.MQ_CONN_URL,
  function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = 'events';

      channel.assertQueue(queue, {
        durable: true,
      });
      channel.prefetch(1);
      console.log(
        ' [*] Waiting for messages in %s. To exit press CTRL+C',
        queue
      );
      process.on('beforeExit', () => {
        connection.close();
      });
      channel.consume(
        queue,
        async function (msg) {
          console.log('[x] Recieved %s', msg.content.toString());
          try {
            const event = JSON.parse(msg.content.toString());
            await Event.create({
              ...event,
            });
          } catch (error) {
            console.error(error);
          }
        },
        {
          noAck: true,
        }
      );
    });
  }
);
