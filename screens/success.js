import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import Footer from '../shared/footer';
import Header from '../shared/header';
import CreditCardDisplay from "react-native-credit-card-display";

const Success = (props) => {
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
		 	 <Header nav={props.navigation} />
		  </View>
          <View style={styles.container}>
            <Text style={styles.title}>Compra Realizada</Text>
			
            <View style={styles.botones} >
                <Text style={styles.botonIr} onPress={() => props.navigation.navigate('Cart')} >volver</Text>
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
		title:{
			fontFamily: 'Montserrat_700Bold',
			color: "#fff",
			textAlign: "center",
			backgroundColor: "#58482a",
			paddingVertical: 10,
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
    
    export default connect(mapStateToProps, mapDispatchToProps)(Success)