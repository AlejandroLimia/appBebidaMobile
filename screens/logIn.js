import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Header from '../shared/header';
import Footer from '../shared/footer';


export default function LogIn({ navigation }) {
	const image = require('../assets/background2.jpg');
	const [mail, setMail] = useState("")
	const [pass, setPass] = useState("")
	const sendInfo = async => {
		alert("bienvenido")
	}

	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
            <>
       
		<ImageBackground source={image} style={styles.banner}>
		<View style={styles.container}>
			<View style={styles.containerDos}>
				<Text style={styles.bold}>Ingresar a mi cuenta</Text>
				<TextInput
				keyboardType= 'email-address'
				style={styles.inputs}
				placeholder="example@mail.com"
				placeholderTextColor="#9e9e9e" 
				onChangeText={(val) => setMail(val)}
				/>
				<TextInput
				secureTextEntry= "true"
				style={styles.inputs}
				onChangeText={(val)=> setPass(val)}
				placeholder="escribe tu contraseña"
				placeholderTextColor="#9e9e9e"  
				/>
			    <Button
					color="#fff"
					title="ingresar"
					onPress={sendInfo}
				/>
				<Button
				    color="#fff"
					title="Crear cuenta "
					onPress={() => navigation.navigate('Registrarse')}
				/>
			</View>
		</View>
		</ImageBackground>
		<View>
		 <Footer nav={navigation}/>
		</View>
        </>
		)
	}
}

const styles = StyleSheet.create({
	header:{
		backgroundColor: "#191919",
		height: 80,
		borderBottomColor: "#353535",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:"#0000006c",
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
        fontFamily: 'Montserrat_700Bold',
		color: '#fff',
		fontSize: 20,
		marginBottom: 10
	},
	
	banner:{
		flex: 1,
	 
	 },
	inputs:{
	  margin: 10,
	  height: 40, 
	  borderBottomColor: '#D1B653', 
	  borderBottomWidth: 2, 
	  color: "#fff", 
	  width:240,
	  textAlign:"center",
	},
	containerDos:{
		display:"flex",
		alignItems: "center",
		justifyContent:"center",
		backgroundColor: "#3a3939b0",
		borderRadius: 8,
		padding: 10,
	},
	
})
