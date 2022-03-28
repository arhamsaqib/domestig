import React from 'react';
import {LogBox} from 'react-native';
import {Domestig} from './src/domestig';
import {allReducers} from './src/redux/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {SplashGreen} from './src/screens/splash/splashGreen';

const App = () => {
  LogBox.ignoreAllLogs();
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };
  const persistedReducer = persistReducer(persistConfig, allReducers);
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Domestig />
      </PersistGate>
    </Provider>
  );
};

export default App;
