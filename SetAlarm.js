import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, Text, View, Button, SafeAreaView, TextInput, Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState, useContext, useEffect} from 'react';
import style from './Style.js';
import AlarmContext from './services/alarmServices.js';
import { sendAlarm } from './services/alarmServices.js';
import LightContext from './services/lightServices.js';
import WindowContext from './services/windowServices.js';


const SetAlarm=()=>{
  const {addAlarm,sendAlarm}= useContext(AlarmContext);
  const [alarmname,setInput]= useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [nextID, setnextID]= useState(1); 

  //Permette di selezionare una data giorno/mese/anno
  const onDateChange = (event, selectedDate) => {
  setShowDatePicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDate(updatedDate);
    }
  };

  //Permette di selezionare un orario ore:minuti
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const updatedDate = new Date(date);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setDate(updatedDate);
    }
  };

  //Crea una nuova sveglia, e invia i dati inseriti al dispositivo (aggiunge la sveglia alla lista in homepage)
  const Add = () => {
    let melodyy;
    if (isEnabledS1)
      melodyy=1;
    else
      melodyy=2;
    const newAlarm = {
      id: nextID,
      name: alarmname,
      date: date.toDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      melody: melodyy,// 1 la prima suoneria, 2 la seconda
      lights: isEnabledal,
      window: isEnabledwindow,
    };
    addAlarm(newAlarm);
    sendAlarm(newAlarm);
    setnextID(prevID => prevID+1);
  };

  //Scelta prima suoneria
  const [isEnabledS1, setIsEnabledS1]= useState(false);
  const toggleSwitchS1 = () => {
      setIsEnabledS1(true);
      setIsEnabledS2(false);
  };

  //Scelta seconda suoneria
  const [isEnabledS2, setIsEnabledS2]= useState(false);
  const toggleSwitchS2 = () => {
      setIsEnabledS2(true);
      setIsEnabledS1(false);
  };
  
  //Switch relativo all'accensione delle luci per una determinata sveglia
  const [isEnabledal, setIsEnabledal]= useState(false);
  const toggleSwitchal = () => {
    setIsEnabledal(prevState => {
      const newState = !prevState;
      return newState;
    });
  }

    //Sceglie l'apertura della serranda 
    const [isEnabledwindow, setIsEnabledwindow]= useState(false);
    const toggleSwitchwindow = () => {
        setIsEnabledwindow(prevState =>{
          const newState=!prevState;
          return newState; 
        })
    };



  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
        <StatusBar backgroundColor='#f5f5f5'/>
        <Text style={style.title}>Sveglie</Text>  
        <View style={style.row}>
            <Text style={style.subtitle}>Aggiungi una sveglia⏰:</Text>
            <Button title='Aggiungi' onPress={Add} color="lightskyblue"/>
        </View>
        <TextInput 
          style={style.input} 
          placeholder="Nome sveglia..." 
          onChangeText={(testo)=>{setInput(testo)} } 
         /> 
      
        <Text style={style.prinsubtitle}>Seleziona data:</Text>
          <View style={style.row}>
          <Text>{date.toDateString()}</Text>
          <Button title="Scegli Data" color= 'lightskyblue' onPress={() => setShowDatePicker(true)} />
        </View>
        <Text style={style.prinsubtitle}>Seleziona ora:</Text>
        <View style={style.row}>
          <Text>{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Button title="Scegli Ora" color= 'lightskyblue' onPress={() => setShowTimePicker(true)} />
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      <Text style={style.prinsubtitle}>Suonerie:</Text>
      <Text style={style.subtitle}>⚠️Scegliere almeno una suoneria!</Text>
      <View style={style.row}>
          <Switch trackColor={{ false: 'black', true:'blue'}} onValueChange={toggleSwitchS1} value={isEnabledS1} />
          <Text style={style.subtitle}>{isEnabledS1? 'Suoneria 1 attivata': 'Suoneria 1 disattivata'}</Text>
      </View>
          <View style={style.row}>
          <Switch trackColor={{ false: 'black', true:'blue'}} onValueChange={toggleSwitchS2} value={isEnabledS2} />
          <Text style={style.subtitle}>{isEnabledS2? 'Suoneria 2 attivata': 'Suoneria 2 disattivata'}</Text>
      </View>
      <Text style={style.prinsubtitle}>Stanza:</Text>
      <View style={style.row}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitchal} value={isEnabledal} />
        <Text style={style.subtitle}>{isEnabledal? '💡Accendi luci': 'Spegni luci🌙'}</Text>
      </View>
      <View style={style.row}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitchwindow} value={isEnabledwindow} />
        <Text style={style.subtitle}>{isEnabledwindow? '🏠Apri serranda': 'Chiudi serranda🪟'}</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default SetAlarm; 


