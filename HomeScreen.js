import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import style from './Style.js';
import LightContext from './services/lightServices.js';
import { onTemperatureChange, onHumidityChange } from './services/weatherServices.js';
import SingleAlarm from './Alarm.js';
import SliderTemp from './Slidertemp.js';
import WindowContext from './services/windowServices.js';
import { AlarmContext } from './services/alarmServices.js';



const HomeScreen=({navigation})=>{
  //Gestione eliminazione elementi dalla lista
  const {alarms,removeAlarm}=useContext(AlarmContext);

  //Switch luci
  const {isEnabled,toggleSwitch} = useContext(LightContext);

  //Switch serranda
  const {isEnabledWnd,toggleSwitchWnd} = useContext(WindowContext);
  const{isEnabledNatural,toggleSwitchNatural}=useContext(WindowContext)

  //Switch luce naturale
  const [treshold, setTreshold] = useState(30); // valore iniziale


  //Aggiornamento temperatura/umidità
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  useEffect(() => {
    onTemperatureChange(val => setTemperature(val));
    onHumidityChange(val => setHumidity(val));
  }, []);


  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
      <StatusBar backgroundColor='#f5f5f5'/>
      <View style={{flexDirection:'row', columnGap:20}}>
      <Text style={style.title}>TiccheTàcch'</Text>  
      <Image source={require('./assets/icon.png')} style={{width: 70, height:70}}/>
      </View>
      <Text style={style.prinsubtitle}>Premere per accendere/spegnere le luci:</Text>
      <View style={style.row}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitch} value={isEnabled} />
        <Text style={style.subtitle}>{isEnabled? '💡Luci accese': 'Luci spente🌙'}</Text>
      </View>
      <Text style={style.prinsubtitle}>Premere per aprire/chiudere la serranda:</Text>
      <View style={style.row}>
          <Switch trackColor={{ false: 'black', true:'lightgreen'}} onValueChange={toggleSwitchWnd} value={isEnabledWnd} />
          <Text style={style.subtitle}>{isEnabledWnd? '🏞️Serranda aperta': 'Serranda chiusa🪟'}</Text>
      </View>
      <Text style={style.title}>Sveglie attive:</Text>
      <View style={style.alarmlist}>
        { alarms.map((item)=>(
          <View key={item.id}>
            <SingleAlarm alarm={{ id: item.id, name: item.name, time:item.time, date:item.date}} 
              onDelete={()=> removeAlarm(item.id)} />
          </View>
        ))}
      </View>
      <Text style={style.title}>La mia stanza: </Text>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Text style={style.subtitle}>Temperatura attuale: {temperature !== null ? `${temperature}°C` : '---'}</Text>
      </View>
      <View style={style.row}>
        <Text style={style.subtitle}>Umidità attuale: {humidity !== null ? `${humidity}%` : '---'}</Text>
      </View>
      <Text style={style.smallerTitle}>Modalità luce naturale</Text>
      <Text style={style.prinsubtitle}>La modalità luce naturale farà alzare e abbassare la serranda in base alla luce esterna</Text>
      <View style={style.row}>
          <Switch trackColor={{ false: 'gray', true:'orange'}} onValueChange={toggleSwitchNatural} value={isEnabledNatural} />
          <Text style={style.subtitle}>{isEnabledNatural? '☀️Modalità attiva': '🌙Modalità disattivata'}</Text>
      </View>
      <Text style={style.prinsubtitle}>Inserire il valore di luminosità per cui l'ambiente è considerato luminoso:</Text>
      <SliderTemp onValueChange={setTreshold}/>
    </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen; 