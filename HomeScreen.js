import { StatusBar } from 'expo-status-bar';
import { ScrollView,StyleSheet, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState} from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import style from './Stile.js';

const HomeScreen=()=>{
  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch=()=> setIsEnabled (prevState => !prevState);
  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
      <StatusBar backgroundColor='#f5f5f5'/>
      <View style={{flexDirection:'row', columnGap:20}}>
      <Text style={style.title}>TiccheTàcch'</Text>  
      <Image source={require('./assets/icon.png')} style={{width: 70, height:70}}/>
      </View>
      <Text style={style.subprintitle}>Premere per accendere/spegnere le luci:</Text>
      <View style={style.riga}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitch} value={isEnabled} />
        <Text style={style.subtitle}>{isEnabled? '💡Luci accese': 'Luci spente🌙'}</Text>
      </View>
      <Text style={style.title}>Sveglie attive:</Text>
      <View style={style.alarmlist}>
      </View>
      <Text style={style.title}>La mia stanza: </Text>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Text style={style.subtitle}>Temperatura attuale:</Text>
      </View>
      <View style={style.riga}>
        <Text style={style.subtitle}>Umidità attuale:</Text>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen; 


