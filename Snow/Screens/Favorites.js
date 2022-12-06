import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, ImageBackground, Image, Button, TouchableOpacity } from 'react-native';
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
        <TextInput onChangeText={onChangeText} value={text} style={styles.input} placeholder="Search for a ski resort in Utah" placeholderTextColor="#99A1B9">
                </TextInput>
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                <View>
                { resort_list?.length > 0 ? resort_list.map((resort, idx) => {
                    return (<View key={idx} style={styles.resortBox}>
                        <ImageBackground source={resortImage} resizeMode="cover" style={styles.resortImage}></ImageBackground>
                        {resort.weather ? <>
                            <View style={styles.resortDataContainer}>
                                <View style={styles.resortRow}>
                                    <View style={styles.resortTempColumn}>
                                        <Text style={styles.resortTemp}>{resort.weather.temperature.max} F</Text>
                                    </View>
                                    <View style={styles.resortIconColumn}>
                                        <Image style={styles.weatherIcon} source={{uri:'https://uploads-ssl.webflow.com/636451cd3d59430da2872c5f/638ecf2c176aded58f9dd30d_icon.png'}}/>
                                        <Text style={styles.conditionText}>{resort.weather.conditions}</Text>
                                    </View>
                                </View>
                                
                                
                            </View>
                        </> : <><Text style={styles.noWeatherText}>No Weather Info Available</Text></>}
                        <View style={styles.resortDataContainer}>
                            <View style={styles.resortRow}>
                                <View style={styles.resortColumn}>
                                    <Text style={styles.resortTitle}>{resort.name} Resort, Utah </Text>
                                </View>

                                <View style={styles.resortColumn}>
                                    <View style={styles.gradeWrapper}>
                                        <Text style={styles.gradeText}>{resort.grade}</Text>
                                    </View>
                                    
                                </View>
                            
                            </View>

                            <View style={styles.resortDetailsRow}>
                                <View style={styles.resortColumnInline}>
                                    <Text style={styles.closedText}>{resort.open ? "Opened" : "Closed"}</Text>
                                    <Text style={styles.favText}> {resort.fav_num} Favorites</Text>
                                </View>
                            </View>

                            </View>
                            <View style={styles.resortButtonRow}>
                                <TouchableOpacity style={styles.resortButton} onPress={() => dispatch(removeResortFB(resort))}>
                                    <Text style={styles.BtnText}>Remove</Text>
                                </TouchableOpacity>
                                {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                                {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                            </View>
                        
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
        paddingRight: 12,
        paddingLeft: 12,
    },
    resorts: {
        flex:1,
        
    },
    resortBox: {
        backgroundColor: "#1279D8",
        flex: 1,
        marginRight:20,
        marginLeft: 20,
        marginBottom: 20,
        borderRadius: 20,
        padding:12,
        color: "#fff",
        display: 'flex',
        flexDirection: 'column',
        overflow:'hidden',
        minWidth: '100%',
        

    },
    resortBoxHidden: {
        flex: 1, 
        backgroundColor: "none",
        marginRight:20,
        marginLeft: 20,
        width:'100%',
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

    resortTemp: {
        color: "#fff",
        fontSize: 48,
    },

    resortDataContainer: {
        flex: 1,
        flexWrap: 'wrap',
        },

    resortRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",

         
    },
    
    resortDetailsRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginBottom: 15,

         
    },
    
    resortButtonRow: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",

         
    },
    

    resortTempColumn: {
        width:"70%",
        paddingBottom: 70,
       
    },

    resortIconColumn: {
        width:"20%",
        flex:1,
        alignItems: 'center',
    },

    resortColumn: {
        color: "#fff",
        
    },
    
    resortColumnInline: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },


    conditionText: {
        marginTop: 5,
        color: "#73ABE4",
        textAlign: "center",
        flex: 1,
    },


    weatherIcon: {
        width: 60,
        height: 60,
    },

    gradeWrapper: {
        backgroundColor: "#fff",
        display: "flex",
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",


        borderRadius: 100,

    },

    gradeText: {
        color: "#0F73CF",
        fontWeight: 'bold',
        fontSize: 12,
    },

    noWeatherText: {
        color: "#73ABE4",
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom:80,
    },

    resortTitle: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18,
    },

    favText: {
        color: "#73ABE4",
    },

    closedText: {
        color: "#73ABE4",
        marginRight: 20,
    },

    resortButton: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        
    },

    resortLearnButton: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginRight: 5,
        
    },

    BtnText: {
        color:'#0F73CF',

    },
});

export default Favorites;
