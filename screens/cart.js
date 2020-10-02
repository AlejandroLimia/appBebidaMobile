import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { connect } from 'react-redux';

 function Cart({ navigation }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
		<View style={styles.container}>
			<Text style={styles.bold}>Cart</Text>
			<Button
				title="Products"
				onPress={() => navigation.navigate('Products', { title: 'test', url: 'vino' })}
			/>
			<Button
				title="Menu Lateral"
				onPress={() => navigation.openDrawer()}
			/>
			<StatusBar style="auto" />
		</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
		fontFamily: 'Montserrat_700Bold'
	}
})
const mapStateToProps = state => {
    return {
        cart: state.userReducer.cart
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => {
			return dispatch(removeFromCart(), actCart())
			
        }
    }
}
//no se que problema tiene con el mapStateToProps por eso le puse null 
export default connect(null, mapDispatchToProps)(Cart)