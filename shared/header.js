import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function Header({ nav }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
		<View style={styles.header}>
			<FontAwesome name="bars" size={24} color="#D1B653" onPress={() => nav.openDrawer()} />
			<Image style={styles.img} source={require('../assets/logoBlanco.png')} />
		</View>
		)
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 0,
		paddingHorizontal: 20,
		borderWidth: 0,
		height: 60,
		width: '100%'
	},
	img: {
		width: 150,
		height: 45
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	}
})