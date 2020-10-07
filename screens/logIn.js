import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, TextInput, ImageBackground } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../shared/header';
import Footer from '../shared/footer';
import axios from 'axios';
import { RUTA_API } from '../shared/constants';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';


 function LogIn( props ) {
	const image = require('../assets/background2.jpg');
	
	const [send, setSend] = useState({
		status: false
	})
	
	const [mail, setMail] = useState("")
	const [pass, setPass] = useState("")
	const sendInfo = async () => {
		send.status = true
		setSend({status: true})
		if (mail === '' || pass === '') {
			alert("Campos obligatorios")
			send.status = false
			setSend({status: false})
		}
		else {
			await props.loginUser({mail, pass}, setSend)
			props.navigation.navigate("Home")
		}
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
				//secureTextEntry= "true"
				style={styles.inputs}
				onChangeText={(val)=> setPass(val)}
				placeholder="escribe tu contraseña"
				placeholderTextColor="#9e9e9e"  
				/>
				<View style={send.status ? {backgroundColor: "gray"} : styles.btnPrimary}>
					<Text onPress={sendInfo}>Ingresar</Text>
				</View>
				<View style={styles.btnSecondary}>
					<Text style={{color: '#fff'}} onPress={() => props.navigation.navigate('Registrarse')}>Crear cuenta</Text>
				</View>
			</View>
		</View>
		</ImageBackground>
		<View>
		 <Footer nav={props.navigation}/>
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
	btnPrimary: {
		backgroundColor: '#D1B653',
		padding: 10,
		minWidth: 105,
		alignItems: "center",
		marginBottom: 10
	},
	btnSecondary: {
		backgroundColor: 'transparent',
		padding: 10,
		minWidth: 100,
		alignItems: "center",
		borderWidth: 1,
		borderColor: '#D1B653',
	},
})
const mapDispatchToProps = {
    loginUser: userActions.loginUser
}

export default connect(null, mapDispatchToProps)(LogIn)