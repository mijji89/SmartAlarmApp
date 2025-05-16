import React from 'react';
import AppNavigator from './Navigator';
import { AlarmProvider } from './Alarm';

export default function App() {
  return ( 
    <AlarmProvider>
      <AppNavigator />
    </AlarmProvider>
    );
}
