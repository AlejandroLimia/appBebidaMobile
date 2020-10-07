import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, Image} from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Footer from '../shared/footer';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import { Snackbar } from 'react-native-paper';


 function LogIn( props ) {
	const image = require('../assets/background2.jpg');
	
	const [visible, setVisible] = useState(false);

	const onToggleSnackBar = (text) => {
		setVisible(!visible);
		setSnack(text)
	}
  
	const onDismissSnackBar = () => {
		setVisible(false)
		setSnack('')
	};

	const [snacktext, setSnack] = useState('')

	const [send, setSend] = useState({
		status: false
	})
	
	const [mail, setMail] = useState("")
	const [pass, setPass] = useState("")
	const sendInfo = async () => {
		send.status = true
		setSend({status: true})
		Keyboard.dismiss()
		if (mail === '' || pass === '') {
			onToggleSnackBar('Faltan completar campos.')
			send.status = false
			setSend({status: false})
		}
		else {
			const test = await props.loginUser({mail, pass}, setSend)
			if(test === undefined) {
				onToggleSnackBar('Buenas!')
				props.navigation.navigate("Home")
			} 
			else {
				onToggleSnackBar('Mail o contraseña incorrectos')
			}
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
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
				<View style={send.status ? styles.btnthird : styles.btnPrimary}>
				{send.status 
				?<Image source={require('../assets/loader.gif')} style={{width: 13, height: 13}}/> 
				:<Text onPress={sendInfo}>Ingresar</Text>}
				</View>
				<Image source={require('../assets/loader.gif')} style={{display:"none"}}/> 
				<View style={styles.btnSecondary}>
					<Text style={{color: '#fff'}} onPress={() => props.navigation.navigate('Registrarse')}>Crear cuenta</Text>
				</View>
			</View>
		</TouchableWithoutFeedback>
		</View>
		</ImageBackground>
		<View>
		 <Footer nav={props.navigation}/>
		</View>
		<Snackbar
			visible={visible}
			onDismiss={onDismissSnackBar}
			style={{backgroundColor: 'firebrick'}}
			>
			<Text style={{color: 'white', fontWeight: 'bold'}}>{snacktext}</Text>
      	</Snackbar>
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
	btnthird:{
		backgroundColor: 'grey',
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