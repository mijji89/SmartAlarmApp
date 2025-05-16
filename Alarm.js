import React, { createContext, useState } from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import style from './Stile';

export const AlarmContext = createContext();

export const AlarmProvider = ({ children }) => {
  const [alarms, setAlarms] = useState([]);

  const addAlarm = (newAlarm) => {
    setAlarms(prev => [...prev, newAlarm]);
  };

  const removeAlarm = (index) => {
    setAlarms(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AlarmContext.Provider value={{ alarms, addAlarm, removeAlarm }}>
      {children}
    </AlarmContext.Provider>
  );
};

const singleAlarm= ({alarm, onDelete})=>{
    const {name, time, date}=alarm; 
    return(
        <View style={style.item}>
            <Text style={style.itemTitle}>{name}</Text>
            <View style={style.riga}>
                <TouchableOpacity onPress={onDelete}>
                    <Ionicons name="trash-outline" size={24}/>
                </TouchableOpacity>
                <Text style={style.itemText}>Ora: {time}</Text>
                <Text style={style.itemText}>Data: {date}</Text>
            </View>
            <View style={StyleSheet.circular}></View>
        </View>
    )
};
export default singleAlarm; 
