import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ProductCard from '../shared/productCard';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { RUTA_API } from '../shared/constants';
import { Snackbar } from 'react-native-paper';

export default function Products({navigation, route}) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});
	const [info, setInfo] = useState([])

	const [visible, setVisible] = useState(false);

	const onToggleSnackBar = (text, style) => {
		setVisible(!visible);
		setSnack(text)
		setStyle(style)
	}
  
	const onDismissSnackBar = () => {
		setVisible(false)
		setSnack('')
	};

	const [snacktext, setSnack] = useState('')
	const [snackStyle, setStyle] = useState('')

	useEffect(() => {
		fetch(`${RUTA_API}/api/products/${route.params.url}`)
		.then(response => response.json())
		.then(json => setInfo(json.listProducts))
		.catch(err => console.log('falle al comunicarme'))
	}, [route.params.url])

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
						return <ProductCard data={item} ngrok={RUTA_API} navigation={navigation} onToggleSnackBar={onToggleSnackBar}  />
					}}
				/>
				<StatusBar style="light-content" />
			</View>
		</ScrollView>
		</View>
		<Footer nav={navigation} />

		<Snackbar
			visible={visible}
			onDismiss={onDismissSnackBar}
			style={snackStyle === 'error' ? styles.bgError : styles.bgSuccess}
			>
			<Text style={{color: 'white', fontWeight: 'bold'}}>{snacktext}</Text>
      	</Snackbar>
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
	bgSuccess: {
		backgroundColor: 'green'
	},
	bgError: {
		backgroundColor: 'firebrick'
	},
})