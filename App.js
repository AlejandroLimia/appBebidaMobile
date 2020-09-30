import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/home';
import Products from './screens/products';
import Cart from './screens/cart';
import Header from './shared/header';
import LogIn from './screens/logIn'
import Register from './screens/register'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();

function DrawerComp() {
	return (
		<Drawer.Navigator initialRouteName="Home" 
			drawerBackgroundColor="black" >
		  <Drawer.Screen name="Home" component={Home} />
		  <Drawer.Screen name="Cart" component={Cart} />
		  <Drawer.Screen name="LogIn" component={LogIn} />
		  <Drawer.Screen name="Register" component={Register} />
		  <Drawer.Screen name="Products" component={Products} />
		</Drawer.Navigator>
	);
  }

export default function App() {
  return (<>
	<StatusBar barStyle="light-content" />
    <NavigationContainer>
		<Stack.Navigator initialRouteName="Home" >
			<Stack.Screen name="Home" component={DrawerComp} 
			options={{ headerShown: false }}>
			</Stack.Screen>
		</Stack.Navigator>
	</NavigationContainer>
  </>);
}

const styles = StyleSheet.create({
});
