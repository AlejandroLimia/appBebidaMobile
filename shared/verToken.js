import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function VerToken({ navigation }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

	const [token, setToken] = useState('No hay token')

	useEffect(() => {
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem('token')
				if(value !== null) {
				  setToken(value)
				}
			} catch(e) {
				// error reading value
			}
		}
		getData();
	}, [])

    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
		<View style={styles.container}>
			<Text style={styles.bold}>Token</Text>
			<Text>{token}</Text>
		</View>
		)
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
	}
})