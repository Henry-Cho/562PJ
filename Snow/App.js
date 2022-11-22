import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import HomeScreen from "./Screens/HomeScreen"
import Resorts from "./Screens/Resorts"
import ProTips from "./Screens/ProTips"
import Favorites from "./Screens/Favorites"
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import { loginCheckFB } from './redux/modules/userSlice';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator> 
        <Stack.Screen options={{ headerShown: true }} name="Login" component={LoginScreen}/>
        <Stack.Screen options={{ headerShown: true }} name="Signup" component={SignupScreen}/>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown: true,
            title: "Snowboard Scout",
            headerStyle: {
              backgroundColor: '#0B3E8A'
            },
            headerTitleAlign: "left",
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400'
            }
          }}
          />
        <Stack.Screen name="Resort" component={Resorts}/>
        <Stack.Screen name="Favorite" component={Favorites}
        options={{
          title: "Favorites",
          headerStyle: {
            backgroundColor: '#0B3E8A'
          },
          headerTitleAlign: "left",
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400'
          }
        }}
        />
        <Stack.Screen name="ProTips" component={ProTips}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
