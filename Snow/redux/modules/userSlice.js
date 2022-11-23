import { createSlice } from '@reduxjs/toolkit'
import { auth } from "../../firebase"
import * as firebase from "firebase";
import { firestore } from '../../firebase';
import { add_fav } from "./weatherSlice"

const fav_list = firestore.collection("user_fav_list");
const r_list = firestore.collection("resort_list");

const initialState = {
    user: null,
    user_favorite_list: [],
    is_login: false,
    is_loading: true,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        log_in: (state, action) => {
            state.user = action.payload;
            state.is_login = true;
        },
        log_out: (state, action) => {
            state.user = null;
            state.is_login = false;
        },
        set_favorite: (state, action) => {
            state.user_favorite_list = action.payload;
        }
        ,
        set_loading: (state, action) => {
            state.is_loading = action.payload;
        },
        add_favorite: (state, action) => {
            state.user_favorite_list.push(action.payload);
        }
    },
})

export const getUserFavorites = () => {
    return function (dispatch, getState) {

        // Get Favorites from FB
        
        dispatch(set_loading(true));

        let user_info = getState().user.user;

        fav_list
        .get()
        .then((docs) => {
            let u_list = [];

            docs.forEach((d) => {
                if (d.data().user_name === user_info.user_name) {
                    u_list.push(d.data());
                }
            })

            dispatch(set_favorite(u_list));
        })

        dispatch(set_loading(false));
    }
}

export const logoutAction = () => {
    return function (dispatch) {
        dispatch(log_out());
    }
}

export const loginFB = (id, pwd, navigation) => {
    return function (dispatch) {
        auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {

            dispatch(log_in({
                user_name: user.user.displayName,
                id: id,
                user_profile: "",
                uid: user.user.uid,
            }));
            // AsyncStorage.setItem("is_login", JSON.stringify(user))
            navigation.navigate("Home");
        })
    }
}

export const signupFB = (id, pwd, user_name, navigation) => {
    return function (dispatch) {
        auth
        .createUserWithEmailAndPassword(id, pwd)
        .then((user) => {
            console.log(user);

            auth.currentUser.updateProfile({
                displayName: user_name,
            })
            navigation.navigate("Login");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode, errorMessage);
        });
    }
}

export const loginCheckFB = () => {
    return function (dispatch){
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(
                log_in({
                    user_name: user.displayName,
                    user_profile: "",
                    id: user.email,
                    uid: user.uid,
                })
                
            );
            }
            else {
                dispatch(log_out());
            }
        })
    }
}

export const logoutFB = (navigate) => {
    return function (dispatch) {
        auth.signOut().then(() => {
            dispatch(log_out());
            navigate('/');
        })
    }
}

export const addResortFB = (item) => {
    return function (dispatch, getState) {

        let user_info = getState().user.user;

        fav_list
        .add({...item, ...user_info})
        .then((doc) => {
            dispatch(add_favorite({...item, ...user_info}))
            r_list.doc(item.id).update({
                usr_fav_list: firebase.firestore.FieldValue.arrayUnion(user_info.user_name)
            });

            r_list.doc(item.id).update({
                fav_num: firebase.firestore.FieldValue.increment(1)
            })

            dispatch(add_fav({...item, ...user_info}));
        })
    }
}
// Action creators are generated for each case reducer function
export const { log_in, set_loading, add_favorite, set_favorite } = userSlice.actions;

export default userSlice.reducer