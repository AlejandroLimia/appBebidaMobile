import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, LogBox } from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './configureStore.js'
import RoutesApp from './routesApp';

LogBox.ignoreAllLogs(true)

let store = configureStore()

const App = () => {
	return (
		<Provider store={store}>
			<RoutesApp></RoutesApp>
		</Provider>
	);
}
 
export default App;

