import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, Text, View, Button, SafeAreaView, TextInput, Switch} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState, useContext, useEffect} from 'react';
import style from './Stile.js';
import { AlarmContext } from './Alarm.js';
import { accendiLuci, spegniLuci } from './services/lightServices.js';

const SetAlarm=()=>{
  const [pressed, setIsEnabled1]= useState(false);
  const {addAlarm}= useContext(AlarmContext);
  const [alarmname,setInput]= useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

    const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      const updatedDate = new Date(date);
      updatedDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
      setDate(updatedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const updatedDate = new Date(date);
      updatedDate.setHours(selectedTime.getHours());
      updatedDate.setMinutes(selectedTime.getMinutes());
      setDate(updatedDate);
    }
  };

    const Add = () => {
    const newAlarm = {
      name: alarmname,
      date: date.toDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    addAlarm(newAlarm);
  };

  const [isEnabledS1, setIsEnabledS1]= useState(false);
  const toggleSwitchS1 = () => {
      setIsEnabledS1(true);
      setIsEnabledS2(false);
    };

  useEffect(() => {
    if (isEnabledS1) {
      console.log("suoneria 1 attiva");
    } else {
      console.log("suoneria 2 disattiva");
    }
  }, [isEnabledS1]);

  const [isEnabledS2, setIsEnabledS2]= useState(false);
  const toggleSwitchS2 = () => {
      setIsEnabledS2(true);
      setIsEnabledS1(false);
    };
  
  useEffect(() => {
    if (isEnabledS2) {
      console.log("suoneria 2 attiva");
    } else {
      console.log("suoneria 2 disattiva");
    }
  }, [isEnabledS2]);

  const [isEnabledserr, setIsEnabledserr]= useState(false);
    const toggleSwitchserr = () => {
      setIsEnabledserr(prevState => {
        const newState = !prevState;
        return newState;
      });
    }
  useEffect(() => {
    if (isEnabledserr) {
      console.log("serranda aperta");
    } else {
      console.log("serranda chiusa");
    }
  }, [isEnabledserr]);

  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch = () => {
    setIsEnabled(prevState => {
      const newState = !prevState;
      return newState;
    });
  }
  useEffect(() => {
    if (isEnabled) {
      accendiLuci();
      console.log("fatto acceso");
    } else {
      spegniLuci();
      console.log("fatto spento");
    }
  }, [isEnabled]);


  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
        <StatusBar backgroundColor='#f5f5f5'/>
        <Text style={style.title}>Sveglie</Text>  
        <View style={style.riga}>
            <Text style={style.subtitle}>Aggiungi una sveglia⏰:</Text>
            <Button title='Aggiungi' onPress={Add} color="lightskyblue"/>
        </View>
        <TextInput 
          style={style.input} 
          placeholder="Nome sveglia..." 
          onChangeText={(testo)=>{setInput(testo)} } 
         /> 
      
        <Text style={style.subtitle}>Seleziona data:</Text>
          <View style={style.riga}>
          <Text>{date.toDateString()}</Text>
          <Button title="Scegli Data" color= 'lightskyblue' onPress={() => setShowDatePicker(true)} />
        </View>
        <Text style={style.subtitle}>Seleziona ora:</Text>
        <View style={style.riga}>
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
      <View style={style.riga}>
          <Switch trackColor={{ false: 'black', true:'blue'}} onValueChange={toggleSwitchS1} value={isEnabledS1} />
          <Text style={style.subtitle}>{isEnabledS1? 'Suoneria 1 attiva': 'Suoneria 1 disattiva'}</Text>
      </View>
          <View style={style.riga}>
          <Switch trackColor={{ false: 'black', true:'blue'}} onValueChange={toggleSwitchS2} value={isEnabledS2} />
          <Text style={style.subtitle}>{isEnabledS2? 'Suoneria 2 attiva': 'Suoneria 2 disattiva'}</Text>
      </View>
      <Text style={style.prinsubtitle}>Stanza:</Text>
       <View style={style.riga}>
          <Switch trackColor={{ false: 'black', true:'lightgreen'}} onValueChange={toggleSwitchserr} value={isEnabledserr} />
          <Text style={style.subtitle}>{isEnabledserr? '🏞️Apri serranda': 'Chiudi serranda🪟'}</Text>
      </View>
            <View style={style.riga}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitch} value={isEnabled} />
        <Text style={style.subtitle}>{isEnabled? '💡Accendi luci': 'Spegni luci🌙'}</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default SetAlarm; 


