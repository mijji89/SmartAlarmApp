const express = require('express');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');
const cors = require('cors');


const mqttClient = mqtt.connect("mqtts://broker.emqx.io:8883");

mqttClient.on('connect', () => {
  console.log('✅ Connesso al broker MQTT');
  client.publish("sveglia/luci");
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/publish', (req, res) => {
  const { topic, message } = req.body;

  if (!topic || !message) {
    return res.status(400).json({ error: 'Topic e messaggio obbligatori' });
  }

  mqttClient.publish(topic, message, () => {
    console.log(`📤 Pubblicato su ${topic}: ${message}`);
    res.json({ status: 'ok' });
  });
});

app.listen(3000, () => {
  console.log('🚀 Server pronto su http://localhost:3000');
});
