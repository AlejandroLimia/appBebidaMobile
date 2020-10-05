import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const VerToken = (props) => {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

	const [token, setToken] = useState('No hay token')

	// useEffect(() => {
	// 	const getData = async () => {
	// 		try {
	// 			const value = await AsyncStorage.getItem('token')
	// 			if(value !== null) {
	// 			  setToken(value)
	// 			}
	// 		} catch(e) {
	// 			// error reading value
	// 		}
	// 	}
	// 	getData();
	// }, [])
	console.log(props.user)
	
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
		<View style={styles.container}>
			<Text style={styles.bold}>Token</Text>
			<Text>{props.token}</Text>
		</View>
		)
	}
}
const mapStateToProps = state => {
    return{
		token: state.userReducer.token,
		user: state.userReducer
	}
}
 
export default connect(mapStateToProps)(VerToken);

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
	}
})