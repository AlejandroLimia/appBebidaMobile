import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home'
import Products from '../screens/products'

const screens = {
	Home: {
		screen: Home
	},
	Products: {
		screen: Products
	}
}

const HomeStack = createStackNavigator(screens)

function Nav() {
	return (
	  <NavigationContainer>
		<Stack.Navigator initialRouteName="Home">
		  <Stack.Screen name="Home" component={HomeScreen} />
		  <Stack.Screen name="Details" component={DetailsScreen} />
		</Stack.Navigator>
	  </NavigationContainer>
	);
  }


export default NavigationContainer(HomeStack)