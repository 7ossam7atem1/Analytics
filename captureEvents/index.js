const amqp = require('amqplib/callback_api');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

const QUEUE_NAME = 'events';

amqp.connect(process.env.MQ_CONN_URL, function (error0, connection) {
  if (error0) {
    console.error('Failed to connect to RabbitMQ:', error0);
    process.exit(1);
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      console.error('Failed to create channel:', error1);
      process.exit(1);
    }

    console.log('Connected to RabbitMQ');

    channel.assertQueue(QUEUE_NAME, {
      durable: true,
    });

    // Handle preflight OPTIONS request
    // app.options('/event', (req, res) => {
    //   res.setHeader('Access-Control-Allow-Origin', '*');
    //   res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    //   res.sendStatus(204);
    // });

    app.post('/event', (req, res) => {
      console.log('Received request:', req.body);
      const { type, userAgent, ip, browserId, websiteId } = req.body;
      const event = {
        type,
        userAgent,
        ip,
        browserId,
        websiteId,
        createdAt: new Date(),
      };

      channel.sendToQueue(
        QUEUE_NAME,
        Buffer.from(JSON.stringify(event)),
        {},
        (err, ok) => {
          if (err) {
            console.error('Failed to send message to queue:', err);
            return res.status(500).send('Failed to send event');
          }

          console.log(' [x] Sent %s', JSON.stringify(event));
          res.status(200).json({ success: true, event });
        }
      );
    });

    process.on('beforeExit', () => {
      connection.close();
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
