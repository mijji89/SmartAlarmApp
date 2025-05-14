const SERVER_URL = 'http://172.19.135.127:3000/publish'; // indirizzo ip di node red

const sendMQTTMessage = async (value) => {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: 'sveglia/luci',
        message: value.toString(),
      }),
    });

    const data = await response.json();
    if (data.status === 'ok') {
      console.log(`Messaggio inviato: ${value}`);
    } else {
      console.error('Errore nella risposta del server:', data);
    }
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
  }
};

const spegniLuci= () => {
  sendMQTTMessage(0);
};


const accendiLuci = () => {
  sendMQTTMessage(1);
};

export {accendiLuci,spegniLuci};