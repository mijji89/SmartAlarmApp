import React from 'react';
import AppNavigator from './Navigator';
import { AlarmProvider } from './services/alarmServices';
import {useEffect} from 'react';
import { LightProvider } from './services/lightServices';
import { WindowProvider } from './services/windowServices';

export default function App() {

  return ( 
    <AlarmProvider>
      <LightProvider>
        <WindowProvider>
          <AppNavigator />
        </WindowProvider>
      </LightProvider>
      
    </AlarmProvider>
    );
}
