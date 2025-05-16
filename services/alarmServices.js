import mqtt from 'mqtt';
const client = mqtt.connect('ws://192.168.1.3:9001');

client.on('connect',()=>{
  console.log("Connesso a MQTT broker");
})

client.on('error',(err)=>{
  console.error('Errore MQTT',err);
})

client.on('reconnect', () => {
  console.log(' Riconnessione in corso...');
});

const sendMQTTMessageluci = (value) => {
  const topic = 'sveglia/gestionesveglie/luci';
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


const sendMQTTMessageDataGiorno = (value) => {
  const topic = 'sveglia/gestionesveglie/data/giorno';
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

const sendMQTTMessageDataMese = (value) => {
  const topic = 'sveglia/gestionesveglie/data/mese';
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

const sendMQTTMessageDataAnno = (value) => {
  const topic = 'sveglia/gestionesveglie/data/anno';
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

const sendMQTTMessageOra = (value) => {
  const topic = 'sveglia/gestionesveglie/orario/ora';
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


const sendMQTTMessageMinuti = (value) => {
  const topic = 'sveglia/gestionesveglie/orario/minuti';
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

const sendMQTTMessageID = (value) => {
  const topic = 'sveglia/gestionesveglie/sveglia/id';
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

const sendMQTTMessageSuoneria = (value) => {
  const topic = 'sveglia/gestionesveglie/sveglia/suoneria';
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


const spegniLuciSveglia = () => {
  sendMQTTMessageluci(0);
};

const accendiLuciSveglia = () => {
  sendMQTTMessageluci(1);
};

const inviaDataGiorno =(giorno)=>{
    sendMQTTMessageDataGiorno(giorno); 
}; 

const inviaDataMese =(mese)=>{
    sendMQTTMessageDataMese(mese);
}; 

const inviaDataAnno=(anno)=>{
    sendMQTTMessageDataAnno(anno); 
};

const inviaOra= (ora)=>{
    sendMQTTMessageOra(ora);
}; 

const inviaMinuti= (minuti)=>{
    sendMQTTMessageMinuti(minuti); 
};

const inviaID= (id)=>{
    sendMQTTMessageID(id);
};

const inviaSuoneria1= () =>{
    sendMQTTMessageSuoneria(1);
}

const inviaSuoneria2= () =>{
    sendMQTTMessageSuoneria(2);
}



export { accendiLuciSveglia, spegniLuciSveglia, inviaDataGiorno, inviaDataMese, inviaDataAnno, inviaOra, inviaMinuti, inviaID, inviaSuoneria1, inviaSuoneria2};