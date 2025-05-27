import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.223.17:9001');

let temperatureCallbacks=[]; 
let humidityCallbacks=[];
let temperature=0; 
let humidity=0;

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
  //sottoscrizione ai topic
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

//Si ricevono messaggi relativi alla temperatura/umidità
client.on('message', (topic, message) => {
  const text = message.toString();
  if (topic === 'sensore/temperatura') {
    temperature = parseFloat(text);
    temperatureCallbacks.forEach(cb => cb(temperature));
  } else if (topic === 'sensore/umidita') {
    humidity = parseFloat(text);
    humidityCallbacks.forEach(cb => cb(humidity));
  }
});

// Funzioni per ottenere l'ultimo messaggio ricevuto per ciascun topic
export function onTemperatureChange(callback) {
  temperatureCallbacks.push(callback);
  if (temperature !== null) callback(temperature);
}

export function onHumidityChange(callback) {
  humidityCallbacks.push(callback);
  if (humidity !== null) callback(humidity);
}