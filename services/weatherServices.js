import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.1.11:9001');

let temperaturaCallbacks=[]; 
let umiditaCallbacks=[];
let temperatura=0; 
let umidita=0;

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
  client.subscribe('sensore/temperatura', (err) => {
    if (err) {
      console.error('Errore nella sottoscrizione:', err);
    } else {
      console.log('Sottoscritto a sensori/temperatura');
    }
  });
  client.subscribe('sensore/umidita', (err) => {
    if (err) {
      console.error('Errore nella sottoscrizione:', err);
    } else {
      console.log('Sottoscritto a sensori/umidita');
    }
  });
})

client.on('error',(err)=>{
  console.error('Errore MQTT',err);
})

client.on('reconnect', () => {
  console.log(' Riconnessione in corso...');
});

client.on('message', (topic, message) => {
  const text = message.toString();
  if (topic === 'sensore/temperatura') {
    temperatura = parseFloat(text);
    temperaturaCallbacks.forEach(cb => cb(temperatura));
  } else if (topic === 'sensore/umidita') {
    umidita = parseFloat(text);
    umiditaCallbacks.forEach(cb => cb(umidita));
  }
});

// Funzioni per ottenere l'ultimo messaggio ricevuto per ciascun topic
export function onTemperaturaChange(callback) {
  temperaturaCallbacks.push(callback);
  if (temperatura !== null) callback(temperatura);
}

export function onUmiditaChange(callback) {
  umiditaCallbacks.push(callback);
  if (umidita !== null) callback(umidita);
}