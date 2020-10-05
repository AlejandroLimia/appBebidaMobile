import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Image, StyleSheet, Text, View,TouchableHighlight } from 'react-native';
import { AppLoading } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { userActions } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const ProductCard = (props) => {
	let [fontsLoaded] = useFonts({
		Montserrat_400Regular,
		Montserrat_700Bold,
	  });
	  if (!fontsLoaded) {
		  return <AppLoading />;
	  } 
	  else {
		  return (
		  <View style={styles.card}>
			  <View style={styles.cardImg} onPress={() => props.navigation.navigate('Product', {id: props.data._id} )}>
				  <Image style={styles.img} source={{uri: `${props.ngrok}/${props.data._id}.jpg`}} />
			  </View>
			  <View style={styles.cardText}>
				  <Text style={{...styles.cardText, fontSize: 18, fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Product', {id: props.data._id})}>{props.data.title}</Text>
				  <View style={styles.cardTextCart}>
					  <Text style={{...styles.cardText, fontSize: 15, fontWeight: 'bold' }} onPress={() => props.navigation.navigate('Product', {id: props.data._id})}>${props.data.price}</Text>
					  <FontAwesome name="cart-plus" size={40} color="#D1B653" onPress={() => props.addToCart(props.data._id, 1)} />
				  </View>
			  </View>
		  </View>
		  )
	  }
  }
 
const mapStateToProps = state => {
    return {
        
    }
}
const mapDispatchToProps = {
	addToCart: userActions.addToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);

const styles = StyleSheet.create({
	card: {
		borderWidth: 2,
		borderBottomColor: '#D1B653',
		width: '100%',
		height: 100,
		flexDirection: 'row',
		padding: 3,
		marginBottom: 10
	},
	cardImg: {
		width: '30%'
	},
	img: {
		width: 60,
		height: 95
	},
	cardText: {
		width: "70%",
		color: 'white',
		justifyContent: "space-around"
	},
	cardTextCart: {
		flexDirection: 'row',
		justifyContent: "space-between",
		paddingRight: 10,
		width: 200,
		color: 'white'
	},
	header: {
		flexDirection: 'row',
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginHorizontal: 0,
		paddingHorizontal: 20,
		borderWidth: 0,
		height: 60,
		width: '100%'
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	}
})