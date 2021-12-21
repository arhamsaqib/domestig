import React from 'react';
import {LogBox} from 'react-native';
import {Domestig} from './src/domestig';

const App = () => {
  LogBox.ignoreAllLogs();
  return <Domestig />;
};

export default App;
