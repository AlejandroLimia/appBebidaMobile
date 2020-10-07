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

const Cart = (props) => {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });
	  const moneyTotal = () => {
		let m = 0
		props.cart.map(product => {
			m += (product.quantity * product.price)
		})
		return `$${m}`
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
			<Text style={styles.title}>CARRITO</Text>
			<ScrollView>
			  {props.cart.length === 0
			  ? <Text style={styles.noItems}>No hay items en el carrito</Text>
			  : props.cart.map((item,index) => {
				  return (
				  <View style={styles.allItems} key={index}>
					<View style={styles.infoItem}>
						<Image style={styles.TheImage} source={{uri:`${RUTA_API}/${item._id}.jpg`}}></Image>
						<View>
							<Text style={styles.bold}> {item.title} <Text style={styles.regularr}>{item.ml}ml / {item.alcPct}%</Text></Text>
							<Text style={styles.regular}>{item.quantity} x ${item.price}</Text>
						</View>
					</View>
					<View>
						<Text style={styles.bolder} onPress={() => props.removeFromCart(item._id)}> X</Text>
					</View>
				  </View>
				  )
			  })
			}
			</ScrollView>
			{props.cart.length !== 0 && 
			 (<>
			 <View style={styles.total}>
				<Text style={styles.totale}>Total</Text>
				<Text style={styles.price} >{moneyTotal()}</Text>
		     </View>
			<View style={styles.botones} >
					<Text style={styles.botonVaciar} onPress={props.clearCart}>Vaciar carrito</Text>
					<Text style={styles.botonIr} onPress={() => props.navigation.navigate('Checkout')} >Pagar</Text>
			</View>
			</>)}
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
	allItems:{
		marginHorizontal:10,
		paddingHorizontal: 10,
		display:"flex",
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomColor: "#58482a",
		borderBottomWidth: 3,
	},
	infoItem:{
		display:"flex",
		flexDirection: "row",
		alignItems:"center",
	},
	regular: {
		fontFamily: 'Montserrat_400Regular',
		color: "#fff",
		paddingLeft: 4,
		fontSize: 18,
		marginTop: 5,
	},
	regularr: {
		fontFamily: 'Montserrat_400Regular',
		color: "#fff",
		paddingLeft: 4,
		fontSize: 13,
	},
	bold: {
		fontFamily: 'Montserrat_700Bold',
		color: "#fff",
		fontSize: 18,
		
	},
	noItems:{
		fontFamily: 'Montserrat_400Regular',
		color: "#fff",
		fontSize: 18,
		textAlign: "center",
		marginVertical:100
	},
	title:{
		fontFamily: 'Montserrat_700Bold',
		color: "#fff",
		textAlign: "center",
		backgroundColor: "#58482a",
		paddingVertical: 10,
	},	
	bolder: {
		fontFamily: 'Montserrat_700Bold',
		color: "#fff",
		fontSize: 20,
		marginTop: 10,
	},
	header:{
		backgroundColor: "#191919",
		height: 80,
		borderBottomColor: "#353535",
		borderBottomWidth: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	TheImage:{
		marginTop:20,
		height: 100,
		width:50,
	},
	total:{
		display:"flex",
		flexDirection:"row",
		alignItems:"center",
		padding:20,
		borderTopColor: "#353535",
		borderTopWidth:1,
	},
	price:{
		marginHorizontal: 10,
		color:"#fff",
		fontSize: 20,
	},	
	totale:{
		fontFamily: 'Montserrat_700Bold',
		color:"#fff",
		fontSize: 20,
		
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
	clearCart: userActions.clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)