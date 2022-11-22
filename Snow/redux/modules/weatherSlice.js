import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
// import { auth } from "../../shared/firebase"
// import firebase from "firebase/compat/app";
// import { firestore } from '../../shared/firebase';
// import moment from "moment";


const initialState = {
    resort_list: [],
    is_loading: true,
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        set_list: (state, action) => {
            state.resort_list = action.payload;
        },
        set_loading: (state, action) => {
            state.is_loading = action.payload;
        },
        add_resort_list: (state, action) => {
            state.resort_list.push(action.payload);
        }
    },
})

export const getResortDB = () => {
    return function (dispatch, getState) {
        
        dispatch(set_loading(true));

        if (getState().weather.resort_list.length == 8) {
            dispatch(set_loading(false));
            return; 
        }

        dispatch(set_list([]));

        const utah_resorts = ["alta", "brighton", "snowbird", "parkcity", "brianhead", "solitude", "deer-valley", "snowbasin"];
        // resorts that do not have weather info
        // alta, park city, soliditude
        utah_resorts.forEach((resort) => {
            const options = {
                url: `https://liftie.info/api/resort/${resort}`,
                method: "GET",
            };

            axios(options)
            .then((res) => {
                console.log(res.data)
                dispatch(add_resort_list(res.data));
            })
            .catch((err) => console.log(err))
        })

        dispatch(set_loading(false));
    }
}

// Action creators are generated for each case reducer function
export const { set_list, set_loading, add_resort_list } = weatherSlice.actions;

export default weatherSlice.reducer