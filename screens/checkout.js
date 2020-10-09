import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableWithoutFeedback,Keyboard, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import Footer from '../shared/footer';
import Header from '../shared/header';
import CreditCardDisplay from "react-native-credit-card-display";
import { Snackbar } from 'react-native-paper';

const Checkout = (props) => {
    let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });

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

	const [card, setCard] = useState({
		  expiry: " ",
		  cvc: 123,
		  number: {},
		  name: " ",
		  flip: false,
	  })
	  const [error, setError] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	})
	const [send, setSend] = useState({
		status: false
	})
	
	
	const actualizarHandler = async ()=> {
		send.status = true
		setSend({ status: true })
		Keyboard.dismiss()
		if (validation(card)) {
			props.navigation.navigate('Success')
			
		}else{
			onToggleSnackBar('Por favor revise los campos')
			send.status = false
			setSend({ status: false })
			setError({
				...error,
				ok: false
			})
		}
	}
	
	const validation = card => {
		error.ok = true
		// RegEx
		const num = RegExp(/\d./)							

		// cvc
		if (card.cvc === 123 || card.cvc === '') {
			error.cvc = 'El numero de seguridad no puede estar vacio'
			error.ok = false
		}
		else if (!num.test(card.cvc)) {
			error.cvc = 'Solo puede contener números'
			error.ok = false
		}
		else error.cvc = ''
			  
		  
		// expiry
		if (card.expiry === ' ') {
			error.expiry = 'La fecha de vencimiento no puede estar vacia'
			error.ok = false
		}

		else if (!num.test(card.expiry)) {
			error.expiry = 'Solo puede contener numeros '
			error.ok = false
		}

		else error.expiry = ''
		  
		// name
		if (card.name === ' ' || card.name === '') {
			error.name = 'El nombre no puede estar vacío'
			error.ok = false
		}
		else error.name = ''
		  
		  
		// number
		if (card.number === {} || isNaN(card.number) ) {
			error.number = 'El numero de la tarjeta no puede estar vacio'
			error.ok = false
		}
		else if (!num.test(card.number)) {
			error.number = 'Solo puede contener números'
			error.ok = false
		}
		else if (card.number.toString().length < 16) {
			error.number = 'El número no está completo'
			error.ok = false
		}
		else error.number = ''
	  
		//Return
		return error.ok
	}
  
	  const inputHandler = (value, field) => {
		if(field === 'expiry' && value === '') {
			value = ' '
		}
		setCard({
			...card,
			[field]: value
		})
	}
  
	  if (!fontsLoaded) {
		  return <AppLoading />;
	  } 
	  else {
		  return (<>
           <View style={styles.header}>
		 	 <Header nav={props.navigation} />
		  </View>
          <View style={styles.container}>
            <Text style={styles.title}>Pagar</Text>
			<View style={styles.card} >
				<CreditCardDisplay
					number={card.number}
					cvc={card.cvc}
					expiration={card.expiry}
					name={card.name}
					since="   "
					fontSize={20}
					flipped={card.flip}
					frontStyles={{color: "#fff"}}
					cardStyles={{color: "#fff"}}
				/>
			</View>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<ScrollView>
				<View  style={styles.card}>
					<TextInput 
					style={styles.inputs}
					placeholder="Numero. 16 digitos"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')} 
					keyboardType= 'number-pad'
					maxLength= {16}
					onChangeText={(val) => inputHandler(parseInt(val), 'number')} 
					/>
					<Text style={{ color: "red" }}>{error.number}</Text>
					<TextInput 
					style={styles.inputs}
					placeholder="Nombre. Ej: Juan Perez"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')} 
					onChangeText={(val) => inputHandler(val, 'name')}
					 />
					<Text style={{ color: "red" }}>{error.name}</Text>
					<TextInput 
					style={styles.inputs}
					placeholder="Fecha de expiracion. MM/AA"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')}
					keyboardType= 'number-pad'
					maxLength= {4}
					onChangeText={(val) => inputHandler(val, 'expiry')}
					/>
					<Text style={{ color: "red" }}>{error.expiry}</Text>
					<TextInput 
					style={styles.inputs}
					placeholder="Codigo de seguridad"
					placeholderTextColor="#999999" 
					onFocus={() => inputHandler(true, 'flip')}
					keyboardType= 'number-pad'
					maxLength= {4}
					onChangeText={(val) => inputHandler(val, 'cvc')} 
					/>
					<Text style={{ color: "red" }}>{error.cvc}</Text>
				</View>
				</ScrollView>
            </TouchableWithoutFeedback>
            <View style={styles.botones} >
                <Text style={styles.botonIr} onPress={() => props.navigation.navigate('Cart')} >Volver</Text>
                <Text style={styles.botonVaciar} onPress={actualizarHandler}>Pagar</Text>
            </View>

          </View>
          <Footer nav={props.navigation} />
		  <Snackbar
			visible={visible}
			onDismiss={onDismissSnackBar}
			style={{backgroundColor: 'firebrick'}}
			>
		  <Text style={{color: 'white', fontWeight: 'bold'}}>{snacktext}</Text>
		  </Snackbar>
          </>)
      }
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            backgroundColor: "#000",
		},
		card:{
		 display:'flex',
		 alignItems: 'center',
		 marginVertical: 12.5
		},
		title:{
			fontFamily: 'Montserrat_700Bold',
			color: "#fff",
			textAlign: "center",
			backgroundColor: "#58482a",
			paddingVertical: 10,
		},	
		inputs:{
			margin: 10,
			height: 20, 
			borderBottomColor: '#D1B653', 
			borderBottomWidth: 2, 
			color: "#fff", 
			width:240,
			textAlign:"center",
		  },
        header:{
            backgroundColor: "#191919",
            height: 80,
            borderBottomColor: "#353535",
            borderBottomWidth: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        bold: {
            fontFamily: 'Montserrat_700Bold',
            color: "#fff",
            fontSize: 18,
            
        },
        botones:{
            display:"flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 20,
        },	
        botonIr:{
            backgroundColor: '#D1B653',
            padding: 10,
            width: 140,
            textAlign:"center",
            marginLeft: 2,
        },
        botonVaciar:{
            width: 140,
            textAlign:"center",
            color: "#fff",
            backgroundColor: 'transparent',
            padding: 10,
            borderWidth: 1,
            borderColor: '#D1B653',
        },
    })

    const mapStateToProps = state => {
        return {
            cart: state.userReducer.cart
        }
    }
    const mapDispatchToProps = {
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Checkout)