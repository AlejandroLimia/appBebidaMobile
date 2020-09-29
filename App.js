import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/home';
import Products from './screens/products';
import Cart from './screens/cart';
import Header from './shared/header';

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function DrawerComp() {
	return (
		<Drawer.Navigator initialRouteName="Home">
		  <Drawer.Screen name="Home" component={Home} />
		  <Drawer.Screen name="Cart" component={Cart} />
		</Drawer.Navigator>
	);
  }

export default function App() {
  return (
    <NavigationContainer>
		<Stack.Navigator initialRouteName="Home" >
			<Stack.Screen name="Home" component={DrawerComp} 
			options={
					({ navigation }) => {
						return({
						headerTitle: (navigation) => <Header nav={navigation} />,
						headerStyle: {
							backgroundColor: 'black'
						}
					})}
			}>
			</Stack.Screen>
			{/* <Stack.Screen name="Home" component={Home} /> */}
			<Stack.Screen name="Products" component={Products} options={{title: 'Prods'}}/>
		</Stack.Navigator>
	</NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
