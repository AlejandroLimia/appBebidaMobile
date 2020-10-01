import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ProductCard from '../shared/productCard';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { RUTA_API } from '../shared/constants';

export default function Products({navigation, route}) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
	const [info, setInfo] = useState([])

	useEffect(() => {
		fetch(`${RUTA_API}/api/products/${route.params.url}`)
		.then(response => response.json())
		.then(json => setInfo(json.listProducts))
		.catch(err => console.log('falle al comunicarme'))
	}, [])

    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (<>
		<View style={styles.header}>
			<Header nav={navigation} />
		</View>
		<View style={styles.container}>
		<ScrollView>
			<View style={styles.container}>
				<Text style={{...styles.bold, color: 'white', fontSize: 20, marginVertical: 15}}>{route.params.title}</Text>
				<FlatList
					style={{width: '90%'}}
					data={info}
					renderItem={({item}) => { 
						return <ProductCard data={item} ngrok={RUTA_API}  />
					}}
				/>
				<StatusBar style="auto" />
			</View>
		</ScrollView>
		</View>
		<Footer nav={navigation} />
		</>)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
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