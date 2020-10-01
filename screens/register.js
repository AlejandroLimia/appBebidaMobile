import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../shared/header';
import Footer from '../shared/footer';
import axios from "axios"
import { RUTA_API } from '../shared/constants';



export default function LogIn({ navigation }) {
	const image = require('../assets/background2.jpg');
	const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    const [mensajes, setMensajes] = useState({
        firstName1: false,
        firstName2: false,
        lastName1: false,
        lastName2: false,
        mail1: false,
        mail2: false,
        pass1: false,
        pass2: false,
    })
    
    const sendInfo = async() => {
		const uname = RegExp(/^[a-zA-Z0-9._]+$/)
		const reMail = RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
		const rePass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[!{}[\]@#$%\^&*)(+=._-]).{5,}/)
     
        mensajes.firstName1 = false
        mensajes.firstName2 = false
        mensajes.lastName1 = false
        mensajes.lastName2 = false
        mensajes.mail1 = false
        mensajes.mail2 = false
        mensajes.pass1 = false
        mensajes.pass2 = false

        if (name === '' || surname === '' || mail === '' || pass === '') {
            alert("Por favor complete todos los campos")

            // name validation
        } else if (name.length < 3) {
            setMensajes({
                ...mensajes,
                firstName1: true
            })
        }   else if (!uname.test(name)) {
            setMensajes({
                ...mensajes,
                firstName2: true
            })

            // lastName validation
        } else if (surname.length < 3) {
            setMensajes({
                ...mensajes,
                lastName1: true
            })
        } else if (!uname.test(surname)) {
            setMensajes({
                ...mensajes,
                lastName2: true
            })

            // mail validation
        } else if (mail.length < 6) {
            setMensajes({
                ...mensajes,
                mail1: true
            })
        } else if (!reMail.test(mail)) {
            setMensajes({
                ...mensajes,
                mail2: true
            })

            // pass validation
        } else if (pass.length < 5) {
            setMensajes({
                ...mensajes,
                pass1: true
            })
        } else if (!rePass.test(pass)) {
            setMensajes({
                ...mensajes,
                pass2: true
            })

        } else {
			const user = {
				firstName:name,
                lastName:surname,
                mail:mail,
                pass:pass
            }

			const response = await axios.post(`${RUTA_API}/api/user/register`, user)
			if (response.data.success ==="false") {
				let errors = response.data.error.errors;
				if (errors.username !== undefined) alert(errors.username.message);
				if (errors.mail !== undefined) alert(errors.mail.message);
				return;
			}
			else {
				try {
					await AsyncStorage.setItem('token', response.data.token)
				} 
				catch (e) {
					console.log(e)
				}
				alert(`Buenas ${response.data.firstName}`)
				navigation.navigate('Home')
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
			<View style={styles.containerDos}>
				<Text style={styles.bold}>Crear cuenta</Text>
				
          		<TextInput
                style={styles.inputs}
				placeholder="Escribe tu nombre aqui"
				placeholderTextColor="#ffffffa9" 
				onChangeText={(val) => setName(val)}
				/>
				{mensajes.firstName1 ? <Text style={styles.mensajeError} >*Tu nombre debe contener al menos 3 caracteres</Text> : mensajes.firstName2 ?  <Text style={styles.mensajeError}>*Tu nombre puede contener solo letras mayusculas, minusculas, numeros, '_' y '.'</Text> : <Text></Text>}
        
				
				<TextInput
						style={styles.inputs}
						placeholder="Ecribe tu apellido aqui"
						placeholderTextColor="#ffffffa9" 
						onChangeText={(val) => setSurname(val)}
					/>
					{mensajes.lastName1 ? <Text style={styles.mensajeError}>*Tu apellido debe contener al menos 3 caracteres</Text> : mensajes.lastName2 ?  <Text style={styles.mensajeError}>*Tu apellido puede contener solo letras mayusculas, minusculas, numeros, '_' y '.'</Text> : <Text></Text>}
				
					<TextInput
						style={styles.inputs}
						keyboardType= 'email-address'
						placeholder="Escribe tu email aqui"
						placeholderTextColor="#ffffffa9"
						onChangeText={(val) => setMail(val)}
					/>
					{mensajes.mail1 ? <Text style={styles.mensajeError}>*Tu mail debe contener al menos 6 caracteres</Text> : mensajes.mail2 ?  <Text style={styles.mensajeError}>*Tu mail debe ser un mail valido, por ejemplo: 'example@server.com</Text> : <Text></Text>}
			
				
				<TextInput
					style={styles.inputs}
					// secureTextEntry= "true"
					placeholder="Escribe tu contraseña aca"
					placeholderTextColor="#ffffffa9"
					onChangeText={(val)=> setPass(val)}
				/> 
				{mensajes.pass1 ? <Text style={styles.mensajeError}>*Tu contraseña debe contener al menos 5 caracteres</Text> : mensajes.pass2 ?  <Text style={styles.mensajeError}>*Tu contraseña debe contener al menos una letra mayuscula, una minuscula y un numero </Text> : <Text></Text>}
                <View style={styles.btnPrimary}>
					<Text onPress={sendInfo}>Crear cuenta</Text>
				</View>
				<View style={styles.btnSecondary}>
					<Text style={{color: '#fff'}} onPress={() => navigation.navigate('LogIn')}>Ya tengo cuenta</Text>
				</View>
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
		width: 380
	},
	mensajeError:{
		color:"red",
		alignSelf: 'center',
		textAlign:"center",
		marginBottom:10,
 
	},
	btnPrimary: {
		backgroundColor: '#D1B653',
		padding: 10,
		minWidth: 100,
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