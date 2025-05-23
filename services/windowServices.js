import mqtt from 'mqtt';
import HomeScreen from '../HomeScreen';
import React, {createContext,useState,useEffect, Children} from 'react'; 
const WindowContext = createContext();
const client = mqtt.connect('ws://192.168.227.69:9001');//CAMBIARE IP con quello del pc connesso alla rete mobile

export const WindowProvider =({children}) =>{
  //variabili di stato dello switch
  const[isEnabledWnd, setIsEnabledWnd]=useState(false);

  useEffect(()=>{
    //Sottoscrizione al topic per ricevere lo stato della serranda
    client.on('connect',()=>{
      console.log("Connesso a MQTT broker");
      client.subscribe('sveglia/stato/serranda', (err) => {
        if (err) {
          console.error('Errore nella sottoscrizione:', err);
        } else {
          console.log('Sottoscritto a sveglia/stato/serranda');
        }
      });
    });

    client.on('error',(err)=>{
      console.error('Errore MQTT',err);
    });

    client.on('reconnect', () => {
      console.log(' Riconnessione in corso...');
    });

    //Si ricevono messaggi relativi allo stato della serranda
    client.on('message', (topic, message) => {
      const text = message.toString();
      if (topic === 'sveglia/stato/serranda') {
        const stato = text === '1';
        setIsEnabledWnd(stato);
      }
    });
  },[]);

  //invia il comando di accensione/spegnimento luci
  const sendMQTTMessage = (value) => {
    const topic = 'sveglia/serranda';
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


  const closeWindow = () => {
    sendMQTTMessage(0);
  };

  const openWindow = () => {
    sendMQTTMessage(1);
  };

  const toggleSwitchWnd = () =>{
    setIsEnabledWnd(prevState => {
    const newState = !prevState;
    if(newState == true)
      openWindow();
    else
      closeWindow();
    return newState;})
  }

  return (
    <WindowContext.Provider value={{isEnabledWnd, toggleSwitchWnd}}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContext;

