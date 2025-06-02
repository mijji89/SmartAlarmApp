import mqtt from 'mqtt';
import HomeScreen from '../HomeScreen';
import React, {createContext,useState,useEffect, Children} from 'react'; 
const LightContext = createContext();
const client = mqtt.connect('ws://192.168.223.17:9001');//CAMBIARE IP con quello del pc connesso alla rete mobile

export const LightProvider =({children}) =>{
  //variabili di stato dello switch
  const[isEnabled, setIsEnabled]=useState(false);

  useEffect(()=>{
    //Sottoscrizione al topic per ricevere lo stato delle luci
    client.on('connect',()=>{
      console.log("Connesso a MQTT broker");
      client.subscribe('sveglia/stato/luci', (err) => {
        if (err) {
          console.error('Errore nella sottoscrizione:', err);
        } else {
          console.log('Sottoscritto a sveglia/stato/luci');
        }
      });
    });

    client.on('error',(err)=>{
      console.error('Errore MQTT',err);
    });

    client.on('reconnect', () => {
      console.log(' Riconnessione in corso...');
    });

   //Si ricevono messaggi relativi allo stato delle luci
    client.on('message', (topic, message) => {
      const text = message.toString();
      if (topic === 'sveglia/stato/luci') {
        const state = text === '1';
        setIsEnabled(state);
      }
    });   
  },[]);

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
  
  const lightOff = () => {
      sendMQTTMessage(0);
  };

  const lightUp = () => {
    sendMQTTMessage(1);
  };

  //Gestione dello switch nell'HomeScreen
  const toggleSwitch = () =>{
    setIsEnabled(prevState => {
    const newState = !prevState;
    if(newState == true)
      lightUp();
    else
      lightOff();
    return newState;})
  }

  //Si forniscono le funzioni di utility per gestire le luci
  return (
    <LightContext.Provider value={{isEnabled, toggleSwitch}}>
      {children}
    </LightContext.Provider>
  );
};

export default LightContext;

