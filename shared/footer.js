import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

export default function Footer({ nav }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
        <View style={styles.footer}>
            <FontAwesome name="home" size={40} color="#D1B653" onPress={() => nav.navigate('Home')} />
		</View>
		)
	}
}

const styles = StyleSheet.create({
	footer:{
		backgroundColor: "#191919",
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		borderTopColor: "#353535",
		borderTopWidth: 1,
	},
	img: {
		width: 150,
		height: 45
	},
	
})