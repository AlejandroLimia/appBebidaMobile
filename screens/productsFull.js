import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ProductCard from '../shared/productCard';
import Header from '../shared/header';
import Footer from '../shared/footer';
import { RUTA_API } from '../shared/constants';
import { useLinkProps } from '@react-navigation/native';

export default function ProductsFull({navigation, route}) {
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
		 <text>hola</text>
		</View>
		</>)
	}
}

const styles = StyleSheet.create({
	
	
})