import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default function ProductCard({data, ngrok, navigation, route }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
		<View style={styles.card}>
			<View style={styles.cardImg} onPress={() => navigation.navigate('Product', {id: data._id} )}>
				<Image style={styles.img} source={{uri: `${ngrok}/${data._id}.jpg`}} />
			</View>
			<View style={styles.cardText}>
				<Text style={{...styles.cardText, fontSize: 18, fontWeight: 'bold' }} onPress={() => navigation.navigate('Product', {id: data._id})}>{data.title}</Text>
				<View style={styles.cardTextCart}>
					<Text style={{...styles.cardText, fontSize: 15, fontWeight: 'bold' }} onPress={() => navigation.navigate('Product', {id: data._id})}>${data.price}</Text>
					<FontAwesome name="cart-plus" size={40} color="#D1B653" />
				</View>
			</View>
		</View>
		)
	}
}

const styles = StyleSheet.create({
	card: {
		borderWidth: 2,
		borderColor: '#D1B653',
		width: '100%',
		height: 100,
		flexDirection: 'row',
		padding: 3
	},
	cardImg: {
		width: '30%'
	},
	img: {
		width: 60,
		height: 95
	},
	cardText: {
		width: "70%",
		color: 'white',
		justifyContent: "space-around"
	},
	cardTextCart: {
		flexDirection: 'row',
		justifyContent: "space-between",
		paddingRight: 10,
		width: 200,
		color: 'white'
	},
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
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	}
})