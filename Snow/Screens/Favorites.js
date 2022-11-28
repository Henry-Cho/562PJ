import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, ImageBackground, Button, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserFavorites, loginCheckFB, removeResortFB } from '../redux/modules/userSlice'
import Loading from './LoadingScreen';

const image = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/638515d3a0939d79444432cd_Loading%20Page%20(1).jpg" }
const resortImage = { uri: "https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/63851639402929e57b19f13d_Rectangle%207.jpg" }

const Favorites = ({ navigation}) => {
    const dispatch = useDispatch();
    const resort_list = useSelector((state) => state.user.user_favorite_list);
    const is_loading = useSelector((state) => state.user.is_loading);
    const [text, onChangeText] = useState("");

    useEffect(() => {
        dispatch(loginCheckFB());
        dispatch(getUserFavorites());
    }, [])
    
    return(
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <SafeAreaView style={styles.container}>
        {is_loading ? <><Loading /></> : <>
        <TextInput onChangeText={onChangeText} value={text} style={styles.input} placeholder="Search for a ski resort in Utah" placeholderTextColor={"#fff"}>
                </TextInput>
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                <View>
                { resort_list?.length > 0 ? resort_list.map((resort, idx) => {
                    return (<View key={idx} style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>
                        {resort.weather ? <>
                            <View>
                                <Text style={styles.text}>Highest Temperature: {resort.weather.temperature.max}</Text>
                                <Text style={styles.text}>Condition: {resort.weather.conditions}</Text>
                            </View>
                        </> : <><Text style={styles.text}>No Weather Info Available</Text></>}
                        <Text style={styles.text}>{resort.name} Resort, Utah {resort.open ? "Opened" : "Closed"}</Text>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => dispatch(removeResortFB(resort))}>
                            <Text style={styles.loginBtnText}>Discard</Text>
                        </TouchableOpacity>
                        {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                        {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                    </View>)
                }) : <Text>No Matching Resort</Text>}
                <View style={styles.resortBoxHidden}></View>
                </View>
        </ScrollView>
        </>}
        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0B3E8",
        color: "#fff",
        flex:1,
    },
    resorts: {
        display: 'flex',
        flexDirection: 'column',
    },
    resortBox: {
        backgroundColor: "#1279D8",
        flex: 1,
        marginRight:20,
        marginLeft: 20,
        height: 199,
        marginBottom: 20,
        borderRadius: 20,
        padding:12,
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: "space-between",
        overflow:'hidden',
        
    },
    text: {
        color: "#fff"
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

export default Favorites;
