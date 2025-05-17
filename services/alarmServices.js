import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.1.3:9001'); //CAMBIARE IP con quello del pc connesso alla rete mobile!!

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
})

client.on('error',(err)=>{
  console.error('Errore MQTT',err);
})

client.on('reconnect', () => {
  console.log(' Riconnessione in corso...');
});

//Invia un oggetto JScript trasformando in una stringa JSON
const sendMQTTMessageSveglia = (value) => {
  const topic = 'sveglia/gestionesveglie/aggiunta';
  const message =JSON.stringify( value);

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

//Gestisce la rimozione di una sveglia, inviando l'id della sveglia eliminata
const sendMQTTMessageSvegliaRimozione = (value) => {
  const topic = 'sveglia/gestionesveglie/rimozione';
  const message =value.toString();

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

//Invia i dettagli della sveglia
const inviaSveglia= (sveglia)=>{
  sendMQTTMessageSveglia(sveglia); 
}

//Invia l'id della sveglia da rimuovere
const cancellaSveglia= (svegliaId)=>{
  sendMQTTMessageSvegliaRimozione(svegliaId); 
}
export { inviaSveglia, cancellaSveglia};