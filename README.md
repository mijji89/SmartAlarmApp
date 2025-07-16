# ⏰ SmartAlarm – App di Automazione Domestica

## 🛠️ Tecnologie utilizzate

- **React Native** – Interfaccia utente mobile multipiattaforma
- **MQTT su WebSocket** – Protocollo leggero per la comunicazione in tempo reale
- **ESP32-WROOM** – Microcontrollore per il controllo fisico dei dispositivi

---

## 📱 Descrizione

**SmartAlarm** è un'app mobile progettata per gestire sveglie personalizzate e controllare dispositivi domotici come luci e serrande.  
L'app comunica in tempo reale con un **ESP32** tramite **MQTT su WebSocket**, consentendo un controllo semplice, veloce e affidabile degli impianti domestici.

---

## 🚀 Funzionalità principali

- ⏰ **Gestione sveglie**
  - Creazione, modifica e cancellazione di sveglie personalizzate
  - Attivazione automatica della suoneria sull'ESP32

- 💡 **Controllo utenze domestiche**
  - Accensione/spegnimento luci
  - Apertura/chiusura della serranda motorizzata

- 🌡️ **Monitoraggio ambientale**
  - Visualizzazione in tempo reale di temperatura e umidità rilevate dal sensore sull’ESP32

- 🔌 **Comunicazione in tempo reale**
  - Scambio bidirezionale di comandi e dati tra app ed ESP32 tramite **MQTT over WebSocket**

---

## 🔧 Requisiti

- Dispositivo mobile con **Android/iOS**
- Rete WiFi locale
- Broker MQTT (locale o remoto) accessibile via WebSocket
- Scheda **ESP32** configurata con firmware compatibile MQTT

---

## 🤝 Integrazione con ESP32

L'app è pensata per funzionare in coppia con un firmware ESP32 sviluppato in **MicroPython**, responsabile delle seguenti operazioni:

- Controllo dei relè (luci, serranda)
- Lettura sensori di temperatura e umidità (DHT22)
- Ricezione sveglie e gestione dell'allarme

👉 Repository del firmware ESP32: [SmartAlarmESP32](https://github.com/mijji89/SmartAlarm) 
---


