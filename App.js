import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/home';
import Products from './screens/products';
import Product from './screens/product';
import Cart from './screens/cart';
import Header from './shared/header';
import VerToken from './shared/verToken';
import LogIn from './screens/logIn'
import Register from './screens/register'
import { FontAwesome } from '@expo/vector-icons';
import Logout from './shared/logout';


const HomeStack = createStackNavigator()
const ProductsStack = createStackNavigator()
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => {
	return (
	<HomeStack.Navigator>
		<HomeStack.Screen name="Home" component={Home}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen name="Products" component={Products}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen name="Product" component={Product}
			options={{ headerShown: false }}
		/>
	</HomeStack.Navigator>)
}

// const ProductsStackScreen = ({navigation}) => {
// 	return (
// 	<ProductsStack.Navigator>
// 		<ProductsStack.Screen name="Products" component={Products}
// 			options={{ headerShown: false }}
// 		/>
// 	</ProductsStack.Navigator>)
// }

const App = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen name='Home' component={HomeStackScreen} />
				<Drawer.Screen name="Cart" component={Cart} />
				<Drawer.Screen name="Token" component={VerToken} />
				<Drawer.Screen name="LogIn" component={LogIn} />
				<Drawer.Screen name="LogOut" component={Logout} />
				<Drawer.Screen name="Registrarse" component={Register} />
				{/* <Drawer.Screen name='Products' component={ProductsStackScreen} /> */}
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
 
export default App;


// function DrawerComp() {
// 	return (
// 		<Drawer.Navigator initialRouteName="Home" 
// 			drawerBackgroundColor="black" >
// 		  <Drawer.Screen name="Home" component={Home} />
// 		  <Drawer.Screen name="Cart" component={Cart} />
// 		  <Drawer.Screen name="LogIn" component={LogIn} />
// 		  <Drawer.Screen name="Registrarse" component={Register} />
// 		  <Drawer.Screen name="Products" component={Products} />
// 		</Drawer.Navigator>
// 	);
//   }

// export default function App() {
//   return (<>
// 	<StatusBar barStyle="light-content" />
//     <NavigationContainer>
// 		<Stack.Navigator initialRouteName="Home" >
// 			<Stack.Screen name="Home" component={DrawerComp} 
// 			options={{ headerShown: false }}>
// 			</Stack.Screen>
// 		</Stack.Navigator>
// 	</NavigationContainer>
//   </>);
// }

