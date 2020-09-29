import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_900Black } from '@expo-google-fonts/montserrat';
import Header from '../shared/header';

export default function Home({ navigation }) {
	const image = { uri:  "https://i0.wp.com/www.totalwine.com/media/sys_master/cmsmedia/h18/ha7/8948118093854.jpg" };
	const categories = [
		{nombre: "Vino", foto: "vino"}, 
		{nombre: "Champagne", foto: "champagne"},
		{nombre: "Cerveza", foto: "cerveza"}, 
		{nombre: "Whisky y Espirituosas", foto: "whiskyespirituosas"},
		{nombre: "Sin Alcohol", foto: "sinalcohol"}, 
		{nombre: "Promociones", foto: "promociones"}]

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
			<Header nav={navigation} />
		</View>
		<ScrollView>
			<View style={styles.container}>
			<View style={styles.banner}>
				<ImageBackground source={image} style={styles.banner}></ImageBackground>
			</View>
			<View style={styles.home}>
				<View style={styles.whoWeAre}>
					<Text style={styles.bold}>QUIENES SOMOS</Text>
					<Text style={styles.bold}>Somos una empresa que distribuye alcohol de calidad, tenemos las bebidas alcoholicas mas exclusivas para que nuestros clientes disfruten. Buscamos brindar una experiencia y producto de primera calidad.</Text>
					<Text style={styles.bold}>Si estas buscando bebidas exclusivas para disfrutar aqui vas a poder encontrarlas</Text>
				</View>
				<Text style={styles.bold}>CATEGORIAS</Text>
				<FlatList
					data={categories}
					renderItem={({item}) => (
						<View style={styles.products}>
							<Image source={require("../images/sinalcohol.png")} />
							<Text style={styles.bold}>{item.nombre}</Text>
						</View>

					)}
				/>
			</View>
					{/*<Image source={require("../images/" + category.foto + ".png")} />
					<Image source={require(`../images/${category.foto}.png`)} />*/}
			<View style={styles.footer}>
			<Text style={styles.bold}>footer</Text>
			</View>
		</View>
		</ScrollView>
		</>)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header:{
		backgroundColor: "black",
		height: 80,
		borderBottomColor: "white",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	banner:{
	   height: 200,
	
	},
	footer:{
		backgroundColor: "black",
		height: 80,
		alignItems: "center",
		justifyContent: "center",
		borderTopColor: "white",
		borderTopWidth: 2,
	},
	products:{
		display: "flex",
		alignItems: "center",
		backgroundColor: "red",
		marginVertical: 20,
		marginHorizontal: 80,
		paddingHorizontal: 10,
		paddingVertical:40
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
		color: "white"
	}
})