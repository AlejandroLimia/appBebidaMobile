import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	DrawerContentScrollView,
	DrawerItem
} from '@react-navigation/drawer'
import {
    Drawer,
    Text,
} from 'react-native-paper';
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/userActions';

const DrawerContent = (props) => {
	return ( <>
	<View style={styles.container}>
		<View style={{alignItems: 'center'}}>
			<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
				Buenas {props.name === '' ? 'Invitado/a' : props.name}!
			</Text>
		</View>
		<Drawer.Section>
			<DrawerItem
				icon={() => (
					<FontAwesome name="home" size={24} color="#D1B653" />
				)}
				label='Home'
				labelStyle={{color: 'white'}}
				onPress={() => {props.navigation.navigate('Home')}}
			/>
			{props.token === ''
			?(<>
			<DrawerItem
				icon={() => (
					<Entypo name="login" size={24} color="#D1B653" />
				)}
				label='Ingresar'
				labelStyle={{color: 'white'}}
				onPress={() => {props.navigation.navigate('LogIn')}}
			/>
			<DrawerItem
				icon={() => (
					<FontAwesome name="pencil" size={24} color="#D1B653" />
				)}
				label='Registrarse'
				labelStyle={{color: 'white'}}
				onPress={() => {props.navigation.navigate('Registrarse')}}
			/>
			</>)
			:(<>
			<DrawerItem
				icon={() => (
					<FontAwesome name="shopping-cart" size={24} color="#D1B653" />
				)}
				label='Mi pedido'
				labelStyle={{color: 'white'}}
				onPress={() => {props.navigation.navigate('Cart')}}
			/>
			<DrawerItem
				icon={() => (
					<Entypo name="log-out" size={24} color="#D1B653" />
				)}
				label='Cerrar sesion'
				labelStyle={{color: 'white'}}
				onPress={() => {props.logout()}}
			/>
			</>)
			}

			<View style={styles.cat}>
				<Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Categorias</Text>
			</View>
				<DrawerItem
				label='Cerveza'
				labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
				onPress={() => {props.navigation.navigate('Products', { title: 'Cerveza', url: 'cerveza' })}}
				/>
				<DrawerItem
					label='Champagne'
					labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
					onPress={() => {props.navigation.navigate('Products', { title: 'Champagne', url: 'champagne' })}}
				/>
				<DrawerItem
					label='Vino'
					labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
					onPress={() => {props.navigation.navigate('Products', { title: 'Vino', url: 'vino' })}}
				/>
				<DrawerItem
					label='Whisky y espirituosas'
					labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
					onPress={() => {props.navigation.navigate('Products', { title: 'Whisky y espirituosas', url: 'whiskyespirituosas' })}}
				/>
				<DrawerItem
					label='Sin alcohol'
					labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
					onPress={() => {props.navigation.navigate('Products', { title: 'Sin alcohol', url: 'sinalcohol' })}}
				/>
				<DrawerItem
					label='Promociones'
					labelStyle={{color: 'white', fontSize: 15, marginLeft: 20}}
					onPress={() => {props.navigation.navigate('Products', { title: 'Promociones', url: 'promociones' })}}
				/>
		</Drawer.Section>
	</View>
	</> );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#191919",
		justifyContent: 'center'
	},
	cat: {
		borderBottomColor: 'gray', 
		borderBottomWidth: 2, 
		alignSelf: 'center', 
		width: '90%',
	}
})
 
const mapStateToProps = state => {
    return {
		token: state.userReducer.token,
		name: state.userReducer.firstName
    }
}
const mapDispatchToProps = {
	logout: userActions.logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);