import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.227.69:9001'); //CAMBIARE IP con quello del pc connesso alla rete mobile!!

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
});

client.on('error',(err)=>{
  console.error('Errore MQTT',err);
})

client.on('reconnect', () => {
  console.log(' Riconnessione in corso...');
});

//Invia il valore di base della luminosità quando si seleziona la modalità luceNaturale
const sendMQTTMessageCurrentTime = (value) => {
  const topic = 'sveglia/CurrentTime';
  const message =(value).toString();

  if (client.connected) {
    client.publish(topic, message, (err) => {
      if (err) {
        console.error('Errore durante la pubblicazione MQTT:', err);
      } else {
        console.log(`Messaggio inviato su ${topic}:`);
      }
    });
  } else {
    console.warn('MQTT non connesso, messaggio non inviato');
  }
};

const sendCurrentTime=(curr)=>{
    console.log("inviato");
    sendMQTTMessageCurrentTime(curr);
}

export {sendCurrentTime};