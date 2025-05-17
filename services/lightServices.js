import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.1.11:9001');

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
})

client.on('error',(err)=>{
  console.error('Errore MQTT',err);
})

client.on('reconnect', () => {
  console.log(' Riconnessione in corso...');
});

//invia il comando di accensione/spegnimento luci
const sendMQTTMessage = (value) => {
  const topic = 'sveglia/luci';
  const message = value.toString();

  if (client.connected) {
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Errore durante la pubblicazione MQTT:', err);
      } else {
        console.log(`Messaggio inviato su ${topic}: ${message}`);
      }
    });
  } else {
    console.warn('MQTT non connesso, messaggio non inviato');
  }
};

const spegniLuci = () => {
  sendMQTTMessage(0);
};

const accendiLuci = () => {
  sendMQTTMessage(1);
};

export { accendiLuci, spegniLuci };