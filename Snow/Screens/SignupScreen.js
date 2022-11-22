import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { signupFB } from '../redux/modules/userSlice'

const SignupScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nick, setNick] = useState("");

    const signup = () => {
        dispatch(signupFB(email, password, nick, navigation));
        setEmail("");
        setPassword("");
        setNick("");
    }

    return (<KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            >
            </TextInput>

            <TextInput
                placeholder='Nick Name'
                value={nick}
                onChangeText={text => setNick(text)}
                style={styles.input}
            >
            </TextInput>

            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            >
            </TextInput>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={signup}
                style={[styles.button, styles.buttonOutline]}
            >
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>)
}

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 1,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 200,
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
    }
})