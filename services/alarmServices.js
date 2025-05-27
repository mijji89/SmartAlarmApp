import mqtt from 'mqtt';
import React, {createContext,useState,useEffect} from 'react'; 
import singleAlarm from '../Alarm';
const client = mqtt.connect('ws://192.168.223.17:9001'); //CAMBIARE IP con quello del pc connesso alla rete mobile!!

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);

  //Aggiunge una sveglia alla lista
  const addAlarm = (newAlarm) => {
    setAlarms(prev => [...prev, newAlarm]);
  };

  
  //Invia un oggetto JScript trasformando in una stringa JSON
  const sendMQTTMessageAlarm = (value) => {
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
  const sendMQTTMessageRemoveAlarm = (value) => {
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
  const sendAlarm= (alarm)=>{
    sendMQTTMessageAlarm(alarm); 
  };

  //Invia l'id della sveglia da rimuovere
  const deleteAlarm= (alarmId)=>{
    sendMQTTMessageRemoveAlarm(alarmId); 
  };

  //Rimuove una sveglia dalla lista, mediante l'id - rimozione tramite tasto dell'app
  const removeAlarm = (id) => {
    setAlarms(prev => prev.filter(item=> item.id !== id));
    deleteAlarm(id);
    console.log("sveglia rimossa")
  };

  // Rimuove una sveglia dalla lista, una volta ricevuto l'id - rimozione tramite dispositivo fisico
  const removeAlarmReceived= (id) =>{
    setAlarms(prev => prev.filter(item=> item.id.toString() !== id.toString()));
    console.log("sveglia rimossa")
  };

  useEffect(()=>{
    client.on('connect',()=>{
      console.log("Connesso a MQTT broker");
      //Sottoscrizione
      client.subscribe('sveglia/gestioneSveglie/cancellazione', (err) => {
        if (err) {
          console.error('Errore nella sottoscrizione:', err);
        } else {
          console.log('Sottoscritto a sveglia/gestioneSveglie/cancellazione');
        }
      });
    })
    
    //Riceve l'ID della sveglia che è suonata per poi rimuoverla
    client.on('message', (topic, message) => {
      if (topic === 'sveglia/gestioneSveglie/cancellazione') {
          const id = message.toString();
          removeAlarmReceived(id);
        }
      });

    client.on('error',(err)=>{
      console.error('Errore MQTT',err);
    })

    client.on('reconnect', () => {
      console.log(' Riconnessione in corso...');
    });

  },[]);

  //Fornisce le funzioni di utility 
  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, removeAlarm, sendAlarm,deleteAlarm, removeAlarmReceived }}>
      {children}
    </AlarmContext.Provider>
  );

}

export default AlarmContext;