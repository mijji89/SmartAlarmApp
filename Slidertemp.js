import {Slider} from 'react-native-awesome-slider';
import { useSharedValue, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { createContext, useState, useContext } from 'react';
import { View,Text} from 'react-native';
import style from './Style.js';
import WindowContext from './services/windowServices.js';

//Gestisce lo slider per scegliere la soglia della luminosità
const SliderTemp = ({onValueChange})=>{
    const [displayVal, setDisplayVal] = useState(30);
    const progressVal= useSharedValue(30); 
    const minValue=useSharedValue(0); 
    const maxValue=useSharedValue(100);
    const { setSliderValue } = useContext(WindowContext);
    //Ogni volta che si modifica il valore dello slider si aggiornano tutte le entità in cui esso appare
    const handleValueChange = (val) => {
        setDisplayVal(val);
        onValueChange?.(val);
        setSliderValue(val);
    };
 

    return(
    <GestureHandlerRootView>
        <View style={{padding: 30}}>
            <Slider progress={progressVal} minimumValue={minValue} maximumValue={maxValue} onValueChange={handleValueChange}/>
            <Text>{displayVal.toFixed(2)}</Text>
        </View>
    </GestureHandlerRootView>
    );
}


export default SliderTemp;