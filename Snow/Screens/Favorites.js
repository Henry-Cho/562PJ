import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, SafeAreaView, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getUserFavorites } from '../redux/modules/userSlice'
import Loading from './LoadingScreen';

const Favorites = ({ navigation}) => {
    const dispatch = useDispatch();
    const resort_list = useSelector((state) => state.user.user_favorite_list);
    const is_loading = useSelector((state) => state.user.is_loading);
    const [text, onChangeText] = useState("");

    useEffect(() => {
        dispatch(getUserFavorites());
    }, [])
    
    return(
        <SafeAreaView style={styles.container}>
        {is_loading ? <><Loading /></> : <>
        <TextInput onChangeText={onChangeText} value={text} style={styles.input} placeholder="Search for a ski resort in Utah" placeholderTextColor={"#fff"}>
                </TextInput>
        <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}>
                <View>
                { resort_list?.length > 0 ? resort_list.map((resort, idx) => {
                    return (<View key={idx} style={styles.resortBox}>
                        {resort.weather ? <>
                            <View>
                                <Text>Highest Temperature: {resort.weather.temperature.max}</Text>
                                <Text>Condition: {resort.weather.conditions}</Text>
                            </View>
                        </> : <><Text>No Weather Info Available</Text></>}
                        <Text>{resort.name} Resort, Utah {resort.open ? "Opened" : "Closed"}</Text>
                        {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                        {/* <Button title='Favorite' color={"#fff"} onPress={() => navigation.navigate('Favorite', {name: 'Favorite'})}></Button> */}
                    </View>)
                }) : <Text>No Matching Resort</Text>}
                <View style={styles.resortBoxHidden}></View>
                </View>
        </ScrollView>
        </>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        height: 199,
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

export default Favorites;
