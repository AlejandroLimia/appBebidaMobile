import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import Header from '../shared/header';


export default function LogIn({ navigation }) {
    const [value, onChangeText] = React.useState({
        mail: "",
        pass: ""
    });

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
			<Text style={styles.bold}>Ingresar a mi cuenta</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1,color: "#fff",width:180}}
              placeholder="example@mail.com"
              placeholderTextColor="#9e9e9e" 
              onChangeText={text => onChangeText(text)}
              value={value.mail}
            />
           <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: "#fff", width:180}}
              onChangeText={pass => onChangeText(pass)}
              value={value.pass}
              placeholder="escribe tu contraseña"
              placeholderTextColor="#9e9e9e"  
            />
         
			<Button
				title="Crear cuenta "
				onPress={() => navigation.navigate('Register')}
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