import mqtt from 'mqtt';
import removeAlarm from '../Alarm.js';
const client = mqtt.connect('ws://192.168.1.7:9001'); //CAMBIARE IP con quello del pc connesso alla rete mobile!!

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
const sendMQTTMessageNaturalMode = (value) => {
  const topic = 'sveglia/modalita/luceNaturale';
  const message =( value);
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

const sendNaturalMode=(trashold)=>{
    console.log("inviato");
    sendMQTTMessageNaturalMode(trashold);
}

export {sendNaturalMode};