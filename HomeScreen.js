import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState, useEffect} from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import style from './Stile.js';
import { accendiLuci, spegniLuci } from './services/lightServices.js'; // Usa il percorso corretto
import { onTemperaturaChange, onUmiditaChange } from './services/weatherServices.js';

const HomeScreen=()=>{
  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch=()=> setIsEnabled (prevState => { 
    const newstate=!prevState; 
    console.log("fatto");
      if (newstate){
        accendiLuci();
        console.log("fattoacceso");
      }
      else{
        spegniLuci();
        console.log("fattoacceso");
      }
      return newstate; 
    });
    const [isEnabled2, setIsEnabled2]= useState(false);
    const toggleSwitch2=()=> setIsEnabled2 (prevState => { 
      return newstate=!prevState; 
    });

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
      <View style={{flexDirection:'row', columnGap:20}}>
          <Switch trackColor={{ false: 'black', true:'lightgreen'}} onValueChange={toggleSwitch2} value={isEnabled2} />
          <Text style={style.subtitle}>{isEnabled2? '🏞️Serranda aperta': 'Serranda chiusa🪟'}</Text>
        </View>
      <Text style={style.title}>Sveglie attive:</Text>
      <View style={style.alarmlist}>
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


