import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import HomeScreen from "./Screens/HomeScreen"
import ProTips from "./Screens/ProTips"
import Favorites from "./Screens/Favorites"
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import { loginCheckFB } from './redux/modules/userSlice';
import Detail from './Screens/Detail';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name="Login" 
         component={LoginScreen}
         options={{ 
          headerShown: true,
            title: "Snowboard Scout",
            headerStyle: {
              backgroundColor: '#0E2C58'
            },
            headerTitleAlign: "left",
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400'
            }
        }} 
       />
        <Stack.Screen options={{ headerShown: true }} name="Signup" component={SignupScreen}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: true,
            title: "Snowboard Scout",
            headerStyle: {
              backgroundColor: '#0E2C58'
            },
            headerTitleAlign: "left",
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '400'
            }
          }}
          />
        <Stack.Screen name="Favorite" component={Favorites}
        options={{
          title: "Favorites",
          headerStyle: {
            backgroundColor: '#0E2C58'
          },
          headerTitleAlign: "left",
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400'
          }
        }}
        />
        <Stack.Screen name="Detail" component={Detail}
        options={({
          title:"Detail"
        })}/>
        <Stack.Screen
         name="ProTips"
         component={ProTips}
         options={{
          headerShown: true,
          title: "Pro Tips",
          headerStyle: {
            backgroundColor: '#0E2C58'
          },
          headerTitleAlign: "left",
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '400'
          }
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
