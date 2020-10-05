import React from 'react';
import { StyleSheet, Text, View, StatusBar, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/home';
import Products from './screens/products';
import Product from './screens/product';
import Cart from './screens/cart';
import VerToken from './shared/verToken';
import LogIn from './screens/logIn'
import Register from './screens/register'
import Logout from './shared/logout';
import { connect } from 'react-redux';

const HomeStack = createStackNavigator();
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

const RoutesApp = (props) => {

	const rutas = (props.token === '')
	? (<>
		<Drawer.Screen name='Home' component={HomeStackScreen} />
		<Drawer.Screen name="Cart" component={Cart} />
		<Drawer.Screen name="Token" component={VerToken} />
		<Drawer.Screen name="LogIn" component={LogIn} />
		<Drawer.Screen name="Registrarse" component={Register} />
	</>)
	: (<>
		<Drawer.Screen name='Home' component={HomeStackScreen} />
		<Drawer.Screen name="Cart" component={Cart} />
		<Drawer.Screen name="Token" component={VerToken} />
		<Drawer.Screen name="LogOut" component={Logout} />
	</>)

	return (
		<NavigationContainer>
			<Drawer.Navigator>
				{rutas}
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
 
const mapStateToProps = state => {
    return {
        token: state.userReducer.token
    }
}
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(RoutesApp);

