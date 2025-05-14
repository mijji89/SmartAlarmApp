import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Button, FlatList, Switch, SafeAreaView,Image} from 'react-native';
import {useState} from 'react';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import style from './Stile.js';

const SetAlarm=()=>{
  const [isEnabled, setIsEnabled]= useState(false);
  const toggleSwitch=()=> setIsEnabled (prevState => !prevState);
  return(
    <ScrollView>
    <SafeAreaView style={style.body}>
        <StatusBar backgroundColor='#f5f5f5'/>
        <Text style={style.title}>Sveglie e utenze</Text>  
        <View style={style.riga}>
            <Text style={style.subtitle}>Aggiungi una sveglia:</Text>
            <Button title='Aggiungi' onPress={()=>{}} color="lightskyblue"/>
        </View>
        <Text style={style.title}>Sveglie impostate:</Text> 


    </SafeAreaView>
    </ScrollView>
  );
};

export default SetAlarm; 


