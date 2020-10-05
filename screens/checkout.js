import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';
import Footer from '../shared/footer';
import Header from '../shared/header';
import { color } from 'react-native-reanimated';
import { RUTA_API } from '../shared/constants';
import product from './product';

const Checkout = (props) => {
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
            <Text style={styles.bold}>Checkout</Text>
            
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