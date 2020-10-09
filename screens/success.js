import React, { useState } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';
import { orderActions } from '../redux/actions/orderActions';
import Footer from '../shared/footer';
import Header from '../shared/header';
import { RUTA_API } from '../shared/constants';

const Success = (props) => {
    let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });
      const [loading, setLoading] = useState(true)
      
      setTimeout(() => {
        setLoading(false)
        {/*const order = {
            userId: props.user.id,
            shippingAddress: props.orderShippingInfo,
            billingAddress: props.orderBillingInfo,
            items: props.user.cart,
            payment: 'Tarjeta de credito'
        }
        props.createOrder(order)*/}
    }, 4000);
	  
  
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
            {loading 
			?< View  style={styles.allThankYouOne}>
			<Image source={{uri:`${RUTA_API}/loader.gif`}} style={{width: 100, height: 100}}/>
			<Text style={styles.thankYouText}>Procesando compra</Text>
			</ View>
            :<View  style={styles.allThankYou}>
                <Text style={styles.thankYou}>¡Muchas gracias por su compra!</Text>
				<Text style={styles.thankYouText}>En breve le llegara un mail.</Text>
			    <Image source={require('../assets/hola3.gif')} />
            </View>}
            <View style={styles.botones} >
                <Text style={styles.botonIr} onPress={() => props.navigation.navigate('Products', {url: "all" })} >Seguir comprando</Text>
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
        allThankYouOne:{
            height: 480,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        allThankYou:{
           display: "flex",
           justifyContent: "space-between",
           height: 480
        },
        thankYou:{
            color: "#fff",
            fontSize: 30,
            textAlign:"center",
            fontWeight: "bold",
            marginTop: 20,
        },
        thankYouText:{
            textAlign:"center",
            color: "#fff",
            fontSize: 18,
            marginTop: 10,
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
            orderShippingInfo: state.userReducer.orderShippingInfo,
		    orderBillingInfo: state.userReducer.orderBillingInfo,
		    user: state.userReducer
        }
    }
    const mapDispatchToProps = {
        createOrder: orderActions.createOrder
    }
    
    export default connect(mapStateToProps, mapDispatchToProps)(Success)