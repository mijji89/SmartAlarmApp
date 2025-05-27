import React, { createContext, useState } from 'react';
import {View, Text, StyleSheet, Touchable, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import style from './Style';
import { deleteAlarm } from './services/alarmServices';

//Costruisce l'elemento "sveglia"
const singleAlarm= ({alarm, onDelete})=>{
    const {name, time, date}=alarm; 
    return(
        <View style={style.item}>
            <Text style={style.itemTitle}>{name}</Text>
            <View style={style.row}>
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
