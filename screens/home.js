import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, ScrollView, StatusBar, Button } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Header from '../shared/header';
import { TouchableHighlight } from 'react-native-gesture-handler';
import Footer from '../shared/footer';

export default function Home({ navigation }) {
	const image = require('../assets/background.jpg');
	const categories = [
		{nombre: "Vino", foto: require('../assets/vino.png'), url: "vino"}, 
		{nombre: "Champagne", foto: require('../assets/champagne.png'), url: "champagne"},
		{nombre: "Cerveza", foto: require('../assets/cerveza.png'), url: "cerveza"}, 
		{nombre: "Whisky y Espirituosas", foto: require('../assets/whiskyespirituosas.png'), url: "whiskyespirituosas"},
		{nombre: "Sin Alcohol", foto: require('../assets/sinalcohol.png'), url: "sinalcohol"}, 
		{nombre: "Promociones", foto: require('../assets/promociones.png'), url: "promociones"}]

	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

	
    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (<>
		<StatusBar barStyle="light-content" />
		<View style={styles.header}>
			<Header nav={navigation} />
		</View>
		<ScrollView>
			<View style={styles.container}>
			<View style={styles.banner}>
				<ImageBackground source={image} style={styles.banner}></ImageBackground>
			</View>
			<Image source={require('../assets/decoration.png')}  style={styles.decorationOne} />
			<Image source={require('../assets/decoration2.png')}  style={styles.decorationTwo} />
			<View style={styles.home}>
				<View style={styles.whoWeAre}>
					<Text style={styles.bolder}>QUIENES SOMOS</Text>
					<Text style={styles.firstText}>Somos una empresa que distribuye alcohol de calidad, tenemos las bebidas alcoholicas mas exclusivas para que nuestros clientes disfruten. Buscamos brindar una experiencia y producto de primera calidad.</Text>
					<Text style={styles.secondText}>Si estas buscando bebidas exclusivas para disfrutar aqui vas a poder encontrarlas</Text>
				</View>
				<Text style={styles.bolderr}>CATEGORIAS</Text>
				<FlatList
				    numColumns={2}
					data={categories}
					renderItem={({item}) => {
						return (
							<TouchableHighlight  
							activeOpacity={0.2}
							underlayColor="#000"
							style={{display: 'flex', alignItems: 'center'}}
							onPress={() => navigation.navigate('Products', { title: item.nombre, url: item.url })}>
								<View style={styles.products}>
									<View style={styles.productsImage}>
										<Image source={item.foto}  />
									</View>
									<Text style={styles.bold}>{item.nombre}</Text>
								</View>
						</TouchableHighlight>
						)

					}}
				/>
			</View>
		</View>
		</ScrollView>
		<View >
			<Footer nav={navigation}/>
		</View>
		</>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header:{
		backgroundColor: "#191919",
		height: 80,
		borderBottomColor: "#353535",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	banner:{
	   height: 200,
	
	},
	decorationOne:{
		position: "absolute",
		zIndex: 1,
		width:130,
		height:290,
		top: 60,
	},
	decorationTwo:{
		position: "absolute",
		zIndex: 1,
		width:130,
		height:280,
		right:0,
		top: 300,
	},
	products:{
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginVertical: 10,
		marginHorizontal: 14,
	},
	productsImage:{
		backgroundColor:"#383838",
		width: 175,
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 5,
		paddingVertical:20,
		marginVertical: 20,
		borderRadius: 20
	},
	home:{
		backgroundColor: "black",
		flex:1,
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold',
		color: "white",
		textAlign: "center"
	},
	bolder:{
		fontFamily: 'Montserrat_700Bold',
		color: "white",
		textAlign: "center",
		fontSize: 20,
		marginBottom: 20,
		marginLeft: -29,
	},
	bolderr:{
		fontFamily: 'Montserrat_700Bold',
		color: "white",
		textAlign: "center",
		fontSize: 20,
		marginBottom: 20,
	
	},
	whoWeAre:{
		margin: 80,
		marginBottom: 120
	},
	firstText:{
		fontFamily: 'Montserrat_400Regular',
		color: "white",
		textAlign: "center",
		width:280,
		marginLeft: -25,
		fontSize: 11
	},
	secondText:{
		fontFamily: 'Montserrat_700Bold',
		color: "white",
		textAlign: "center",
		width:280,
		marginLeft: -27,
		marginVertical:20,
		fontSize: 13
	},
})