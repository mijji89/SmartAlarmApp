import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import style from './Stile.js';
import { accendiLuci, spegniLuci } from './services/lightServices.js'; 
import { onTemperaturaChange, onUmiditaChange } from './services/weatherServices.js';
import SingleAlarm, { AlarmContext } from './Alarm.js';


const HomeScreen=({navigation})=>{
  
  const {alarms,removeAlarm}=useContext(AlarmContext);


  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch = () => {
    setIsEnabled(prevState => {
      const newState = !prevState;
      if(newState == true)
        accendiLuci();
      else
        spegniLuci();
      return newState;
    });
  }

  //useEffect(() => {
   // if (isEnabled == true) {
    //  accendiLuci();
    //  console.log("fatto acceso");
    //} else {
    //  spegniLuci();
    //  console.log("fatto spento");
    //}
  //}, [isEnabled]);

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

      const [temperatura, setTemperatura] = useState(null);
      const [umidita, setUmidita] = useState(null);

      useEffect(() => {
        onTemperaturaChange(val => setTemperatura(val));
        onUmiditaChange(val => setUmidita(val));
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
      <View style={style.riga}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitch} value={isEnabled} />
        <Text style={style.subtitle}>{isEnabled? '💡Luci accese': 'Luci spente🌙'}</Text>
      </View>
      <Text style={style.prinsubtitle}>Premere per aprire/chiudere la serranda:</Text>
      <View style={style.riga}>
          <Switch trackColor={{ false: 'black', true:'lightgreen'}} onValueChange={toggleSwitchserr} value={isEnabledserr} />
          <Text style={style.subtitle}>{isEnabledserr? '🏞️Serranda aperta': 'Serranda chiusa🪟'}</Text>
      </View>
      <Text style={style.title}>Sveglie attive:</Text>
      <View style={style.alarmlist}>
        { alarms.map((item, index)=>(
           <SingleAlarm alarm={{ name: item.name, time:item.time, date:item.date}} 
            onDelete={()=> removeAlarm(index)} />
        ))}
      </View>
      <Text style={style.title}>La mia stanza: </Text>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Text style={style.subtitle}>Temperatura attuale: {temperatura !== null ? `${temperatura}°C` : '---'}</Text>
      </View>
      <View style={style.riga}>
        <Text style={style.subtitle}>Umidità attuale: {umidita !== null ? `${umidita}%` : '---'}</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen; 