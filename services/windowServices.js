import mqtt from 'mqtt';
import HomeScreen from '../HomeScreen';
import React, {createContext,useState,useEffect, Children} from 'react'; 
const WindowContext = createContext();
const client = mqtt.connect('ws://192.168.223.17:9001');//CAMBIARE IP con quello del pc connesso alla rete mobile
import SliderTemp from '../Slidertemp';

export const WindowProvider =({children}) =>{
  //variabili di stato dello switch nell'HomeScreen
  const[isEnabledWnd, setIsEnabledWnd]=useState(false);
  //stato per lo slider - gestisce la modalità luce naturale
  const [sliderValue,setSliderValue] = useState(30);
  //variabile si stato dello switch per la gestione della modalità naturale
  const[isEnabledNatural, setIsEnabledNatural]=useState(false);
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
      client.subscribe('modalitaNaturale/stato/serranda', (err) => {
        if (err) {
          console.error('Errore nella sottoscrizione:', err);
        } else {
          console.log('Sottoscritto a modalitaNaturale/stato/serranda');
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
      else if(topic === 'modalitaNaturale/stato/serranda'){
        const stato = text === '1';
        setIsEnabledWnd(stato);
      }
    });
  },[]);

  //invia il comando di apertura/chiusura della serranda - tramite switch nell'homescreen
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

  
  //invia il comando di apertura/chiusura della serranda con modalità luce naturale
  //L'oggetto inviato contiene lo stato della modalità e la soglia di treshold scelta
  const sendMQTTMessageMod = (value) => {
    const topic = 'sveglia/serranda/modalitaLuceNaturale';
    const message = JSON.stringify(value);

    if (client.connected) {
      client.publish(topic, message, (err) => {
        if (err) {
          console.error('Errore durante la pubblicazione MQTT:', err);
        } else {
          console.log(`Messaggio inviato su ${topic}`);
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

  //Gestione dello switch relativo alla serranda nell'homescreen
  const toggleSwitchWnd=()=>{
    setIsEnabledWnd(prevState => {
    const newState = !prevState;
    if(newState == true){
      openWindow()
      }
    else{
      closeWindow()
    }
    return newState;})
  }

  //Gestione dello switch relativo alla modalità luce naturale nell'homescreen
  const toggleSwitchNatural = () =>{
    setIsEnabledNatural(prevState => {
    const newState = !prevState;
    if(newState == true){
      const payload={
        enabled: 1,
        treshold: sliderValue
      }
      sendMQTTMessageMod(payload)
    }
    else{
      const payload={
        enabled: 0,
        treshold: 0
      }
      sendMQTTMessageMod(payload)
    }

    return newState;})
  }

  //Fornisce le funzioni di utility per la gestione della serranda - sia una gestione normale che in modalità "luce naturale"
  return (
    <WindowContext.Provider value={{isEnabledWnd, toggleSwitchWnd, toggleSwitchNatural,isEnabledNatural, setSliderValue, sliderValue}}>
      {children}
    </WindowContext.Provider>
  );
};

export default WindowContext;

