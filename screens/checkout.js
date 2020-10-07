import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import Footer from '../shared/footer';
import Header from '../shared/header';
import CreditCardDisplay from "react-native-credit-card-display";

const Checkout = (props) => {
    let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });

	  const [card, setCard] = useState({
		  expiry: "1222",
		  cvc: 123,
		  type: 'visa',
		  number: 4134123412341234,
		  name: "Tester Tee",
		  flip: false,
	  })

	  const inputHandler = (value, field) => {
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

				<View  style={styles.card}>
					<TextInput 
					style={styles.inputs}
					placeholder="Numero. 16 digitos"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')} 
					keyboardType= 'number-pad'
					maxLength= {16}
					onChangeText={(val) => inputHandler(parseInt(val), 'number')} />
					<TextInput 
					style={styles.inputs}
					placeholder="Nombre. Ej: Juan Perez"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')} 
					onChangeText={(val) => inputHandler(val, 'name')} />
					<TextInput 
					style={styles.inputs}
					placeholder="Fecha de expiracion. MM/AA"
					placeholderTextColor="#999999"
					onFocus={() => inputHandler(false, 'flip')}
					keyboardType= 'number-pad'
					maxLength= {4}
					onChangeText={(val) => inputHandler(val, 'expiry')} />
					<TextInput 
					style={styles.inputs}
					placeholder="Codigo de seguridad"
					placeholderTextColor="#999999" 
					onFocus={() => inputHandler(true, 'flip')}
					keyboardType= 'number-pad'
					maxLength= {4}
					onChangeText={(val) => inputHandler(val, 'cvc')} />
				</View>

            </TouchableWithoutFeedback>
            <View style={styles.botones} >
                <Text style={styles.botonIr} onPress={() => props.navigation.navigate('Cart')} >volver</Text>
                <Text style={styles.botonVaciar}>pagar</Text>
            </View>

          </View>
          <Footer nav={props.navigation} />
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
			height: 40, 
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
        removeFromCart: userActions.removeFromCart,
        actCart: userActions.actCart
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Checkout)