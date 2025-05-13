import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState} from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import mqtt from 'mqtt';
const styles = StyleSheet.create({
  title: {
    fontSize:35, 
    fontWeight: 'bold', 
    color: '#2b2d42'
  },
  body:{
    flex:1, 
    backgroundColor:'#f5f5f5', 
    padding:50,
  },
  subtitle:{
    fontSize:20,
    fontWeight:300, //leggermente più piccolo del normale
    color: '#808080',
    padding:20,
  },
  alarmlist:{
    flex:1,
    padding:5,
    flexDirection:'column',
    justifyContent:'space-between'
  },
});
const App=()=>{
  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch=()=> setIsEnabled (prevState => !prevState);
  return(
    <SafeAreaView style={styles.body}>
      <StatusBar hidden={true}/>
      <View style={{flexDirection:'row', columnGap:20}}>
      <Text style={styles.title}>TiccheTàcch'</Text>  
      <Image source={require('./assets/icon.png')} style={{width: 70, height:70}}/>
      </View>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Switch trackColor={{ false: 'black', true:'lightblue'}} onValueChange={toggleSwitch} value={isEnabled} />
        <Text style={styles.subtitle}>{isEnabled? '💡Accendi le luci': 'Spegni le luci🌙'}</Text>
      </View>
      <Text style={styles.title}>Sveglie attive:</Text>
      <View style={styles.alarmlist}>
        <FlatList></FlatList>  
      </View>
      <Text style={styles.title}>La mia stanza: </Text>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Text style={styles.subtitle}>Temperatura attuale:</Text>
      </View>
      <View style={{flexDirection:'row', columnGap:20}}>
        <Text style={styles.subtitle}>Umidità attuale:</Text>
      </View>
    </SafeAreaView>
  );
};

export default App; 


