import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default function Logout({ navigation }) {
	useEffect(() => {
		const removeValue = async () => {
			try {
			  await AsyncStorage.removeItem('token')
			} 
			catch(e) {
			 	console.log(e)
			}
			console.log('Done.')
		}
		removeValue();
		navigation.navigate("Home")
	}, [])

	return (
		<></>
	)

}