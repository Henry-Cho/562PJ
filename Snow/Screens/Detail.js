import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, Button, TouchableOpacity, BackHandler, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getResortDB } from '../redux/modules/weatherSlice'
import Loading from './LoadingScreen';
import { addResortFB, getUserFavorites, loginCheckFB } from "../redux/modules/userSlice"
import { useNavigation } from '@react-navigation/native';

const Detail = (props) => {

    const resort = props.route.params.data;
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const is_loading = useSelector((state) => state.weather.is_loading);
    const is_login = useSelector((state) => state.user.is_login);
    const user = useSelector((state => state.user.user));

    return (<SafeAreaView style={styles.container}>
        {is_loading ? <><Loading /></> : <>
        {user && is_login ? <View style={styles.loginView}>
            <Text style={styles.loginText}>Hi {user?.user_name}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Favorite")}>
                <Text style={styles.loginBtnText}>Your Favorites</Text>
            </TouchableOpacity>
        </View> : <></>}
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
            <View style={styles.resortBox}>
                        {resort.weather ? <>
                            <View>
                                <Text style={styles.text}>Highest Temperature: {resort.weather.temperature.max}</Text>
                                <Text style={styles.text}>Condition: {resort.weather.conditions}</Text>
                            </View>
                        </> : <><Text style={styles.text}>No Weather Info Available</Text></>}
                        <Text style={styles.text}>{resort.name} Resort, Utah {resort.open ? "Opened" : "Closed"}</Text>
                        <Text style={styles.text}>Favorite Num: {resort.fav_num}</Text>
                        <Button title='Discard' color={"#fff"} onPress={() => {}}></Button>
            </View>
        </ScrollView>
        </>}
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    loginView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
        alignItems: 'center'
    },
    loginText: {
        fontSize: 16,
        color: "white"
    },
    loginBtn: {
        fontSize: 16,
        backgroundColor: 'white',
        color: "#0B3E8A",
        padding: 6,
        borderRadius: 6
    },
    loginBtnText: {
        fontSize: 16,
        color: "#0B3E8A"
    },
    text: {
        color: "#fff"
    }
    ,
    container: {
        backgroundColor: "#0B3E8A",
        color: "#fff",
        flex:1,
    },
    resorts: {
        display: 'flex',
        flexDirection: 'column',
    },
    resortBox: {
        backgroundColor: "#1279D8",
        width: 338,
        height: 400,
        marginBottom: 20,
        borderRadius: 20,
        padding: 12,
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: "space-between"
    },
    resortBoxHidden: {
        backgroundColor: "none",
        width: 338,
        height: 199,
        marginBottom: 20,
        borderRadius: 20,
        padding: 12,
        color: "#fff"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#2E335A42",
        color: "#fff"
      },
});

export default Detail;