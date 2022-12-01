import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getResortDB } from '../redux/modules/weatherSlice'
import Loading from './LoadingScreen';
import { loginCheckFB } from "../redux/modules/userSlice"
import { useNavigation } from '@react-navigation/native';

const image = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/638515d3a0939d79444432cd_Loading%20Page%20(1).jpg" }
const resortImage = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/63851639402929e57b19f13d_Rectangle%207.jpg" }

const ProTips = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const is_loading = useSelector((state) => state.weather.is_loading);
    const is_login = useSelector((state) => state.user.is_login);
    const user = useSelector((state => state.user.user));
    const [text, onChangeText] = useState("");

    useEffect(() => {
        dispatch(loginCheckFB());
        dispatch(getResortDB());
    }, [text])

    return(
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.container}>
        {is_loading ? <><Loading /></> : <>
        {user && is_login ? <View style={styles.loginView}>
            <Text style={styles.loginText}>Hi {user?.user_name}</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("Favorite")}>
                <Text style={styles.loginBtnText}>Your Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("ProTips")}>
                <Text style={styles.loginBtnText}>Pro Tips</Text>
            </TouchableOpacity>
        </View> : <></>}
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                <View>
                    <View style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>

                        <Text style={styles.text}>Pro Tip 1:</Text>
                        <Text style={styles.text}>Make sure you have the proper gear! You'll need:</Text>
                        <Text style={styles.text}>      - A waterproof jacket</Text>
                        <Text style={styles.text}>      - A pair of waterproof pant</Text>
                        <Text style={styles.text}>      - Some thick socks</Text>
                        <Text style={styles.text}>      - Gloves and goggles</Text>
                        <Text style={styles.text}>      - Most importantly a helmet</Text>
                    </View>
                    <View style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>

                        <Text style={styles.text}>Pro Tip 2:</Text>
                        <Text style={styles.text}>Make sure to plan your fun day on the slopes beforehand!</Text>
                        <Text style={styles.text}>Ask yourself:</Text>
                        <Text style={styles.text}>      - What routs will I go on?</Text>
                        <Text style={styles.text}>      - Where will I park?</Text>
                        <Text style={styles.text}>      - Do I have enough food?</Text>
                        <Text style={styles.text}>      - Do I have enough water?</Text>
                    </View>
                    <View style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>

                        <Text style={styles.text}>Pro Tip 3:</Text>
                        <Text style={styles.text}>Make sure you know what your prefered stance on the board is. This means what foot do you place in front.</Text>
                        <Text style={styles.text}>There are 2 stances: </Text>
                        <Text style={styles.text}>      - Goofy-footed (left forward)</Text>
                        <Text style={styles.text}>      - Regular-footed (right forward)</Text>
                    </View>
                    <View style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>

                        <Text style={styles.text}>Pro Tip 4:</Text>
                        <Text style={styles.text}>When you go snowboarding or skiing, don't be afraid of falling. It will happen more times than you can count, but thats normal!</Text>
                    </View>

                <View style={styles.resortBoxHidden}></View>
                </View>

        </ScrollView>
        </>}
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    loginView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
        alignItems: 'center',
        marginBottom: 15
    },
    loginText: {
        fontSize: 16,
        color: "white",
    },
    loginBtn: {
        fontSize: 16,
        backgroundColor: '#1279D8',
        color: "#0B3E8A",
        padding: 6,
        borderRadius: 6
    },
    loginBtnText: {
        fontSize: 16,
        color: "white"
    },
    text: {
        color: "#fff"
    }
    ,
    container: {
        backgroundColor: "#0B3E8",
        color: "#fff",
        flex:1,
    },
    resortBox: {
        backgroundColor: "#1279D8",
        flex: 1,
        marginRight:20,
        marginLeft: 20,
        height: "auto",
        width: 305,
        marginBottom: 20,
        borderRadius: 20,
        padding:12,
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow:'hidden',

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
    image: {
        flex: 1,
        justifyContent: "center"
    },
    resortImage: {
        width: '110%',
        height:'110%',
        position: 'absolute',
    },
});

export default ProTips;
