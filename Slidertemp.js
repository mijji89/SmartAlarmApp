import {Slider} from 'react-native-awesome-slider';
import { useSharedValue, runOnJS} from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { createContext, useState } from 'react';
import { View,Text} from 'react-native';

import style from './Stile.js';

const SliderTemp = ()=>{
    const progressVal= useSharedValue(30); 
    const minValue=useSharedValue(0); 
    const maxValue=useSharedValue(100);

    
    const [displayVal, setDisplayVal] = useState(30);

    const handleValueChange = (val) => {
        'worklet';
        runOnJS(()=>{
            setDisplayVal(val);
            onValueChange?.(val);
         });
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


export default {SliderTemp};