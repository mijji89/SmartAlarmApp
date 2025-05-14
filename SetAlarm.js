import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, Text, View, Button, SafeAreaView, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from 'react';
import style from './Stile.js';

const SetAlarm=()=>{
  const [pressed, setIsEnabled1]= useState(false);
  const[alrms, setAlarm]=useState([]);
  const addAlarm=(data,ora)=>{
    //setAlarm((prevAlarm)=>{
      //...prevAlarm,
      //{//ogegtto}
    //});
  };
  /*const removeAlarm=()=>{
    setAlarm((prevAlarm)=>prevAlarm.filter((alarm)))
  }*/
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

  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
        <StatusBar backgroundColor='#f5f5f5'/>
        <Text style={style.title}>Sveglie</Text>  
        <View style={style.riga}>
            <Text style={style.subtitle}>Aggiungi una sveglia:</Text>
            <Button title='Aggiungi' onPress={()=>{}} color="lightskyblue"/>
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
    </SafeAreaView>
    </ScrollView>
  );
};

export default SetAlarm; 


