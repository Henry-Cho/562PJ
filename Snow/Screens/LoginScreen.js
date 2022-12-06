import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity,ImageBackground } from 'react-native'
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { loginFB } from '../redux/modules/userSlice'

const image = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/638515d3a0939d79444432cd_Loading%20Page%20(1).jpg" }
const resortImage = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/63851639402929e57b19f13d_Rectangle%207.jpg" }


const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = () => {
        navigation.navigate("Signup");
    }

    const login = () => {
        dispatch(loginFB(email, password, navigation));
        setEmail("");
        setPassword("");
    }

    return (<ImageBackground source={image} resizeMode="cover" style={styles.image}><KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
        
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                placeholderTextColor="#99A1B9" 

            >
            </TextInput>

            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#99A1B9"
            >
            </TextInput>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={login}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={signup}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
        
    </KeyboardAvoidingView></ImageBackground>)
}

export default LoginScreen;

const styles = StyleSheet.create({


    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },

    loginText: {
        fontSize: 16,
        color: "white"
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: "#fff",
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
      },
    buttonText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: 200,
        fontSize: 16,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    resortImage: {
        width: '110%',
        height:'110%',
        position: 'absolute',

    },
})