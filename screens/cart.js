import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import Footer from '../shared/footer';
import Header from '../shared/header';

const Cart = (props) => {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });
  
	  if (!fontsLoaded) {
		  return <AppLoading />;
	  } 
	  else {
		  return (<>
		  <View style={styles.header}>
		 	 <Header nav={props.navigation} />
		  </View>
		  <View style={styles.container}>
			  <Text style={styles.bold}>Cart</Text>
			  {props.cart.map(item => {
				  return <Text>itemId: {item._id} x {item.quantity}</Text>
			  })}
		  </View>
		  <Footer nav={props.navigation} />
		</>)
	  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	},
	header:{
		backgroundColor: "#191919",
		height: 80,
		borderBottomColor: "#353535",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
})

const mapStateToProps = state => {
    return {
        cart: state.userReducer.cart
    }
}
const mapDispatchToProps = {
	removeFromCart: userActions.removeFromCart,
	actCart: userActions.actCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)