import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Header from '../shared/header';

export default function LogIn({ navigation }) {
	let [fontsLoaded] = useFonts({
	  Montserrat_400Regular,
	  Montserrat_700Bold,
	});

    if (!fontsLoaded) {
		return <AppLoading />;
	} 
	else {
		return (
            <>
                <View style={styles.header}>
                    <Header nav={navigation} />
                </View>
		<View style={styles.container}>
			<Text style={styles.bold}>register</Text>
			<Button
				title="ya tengo una cuenta"
				onPress={() => navigation.navigate('LogIn')}
			/>
			<Button
				title="Menu Lateral"
				onPress={() => navigation.openDrawer()}
			/>
			<StatusBar style="auto" />
		</View>
        </>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
        alignItems: 'center',
        
		justifyContent: 'center',
	},
	regular: {
		fontFamily: 'Montserrat_400Regular'
	},
	bold: {
        fontFamily: 'Montserrat_700Bold',
        color: '#fff',
	}
})