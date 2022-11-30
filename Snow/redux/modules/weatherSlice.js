import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { firestore } from '../../firebase';
import { getUserFavorites } from "./userSlice"

const r_list = firestore.collection("resort_list");

const initialState = {
    resort_list: [],
    resorts: [],
    fav_list: [],
    is_loading: true,
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        set_list: (state, action) => {
            state.resort_list = action.payload;
        },
        set_resorts: (state, action) => {
            state.resorts.push(action.payload);
            // sort by grade character order
            state.resorts.sort((a, b) => (a.grade).charCodeAt(0) - (b.grade).charCodeAt(0))
        },
        add_fav: (state, action) => {
            let idx = state.resorts.findIndex((r) => r.name === action.payload.name);
            state.resorts[idx].usr_fav_list.push(action.payload.email);
            state.resorts[idx].fav_num += 1;
        }
        ,
        set_loading: (state, action) => {
            state.is_loading = action.payload;
        },
        add_resort_list: (state, action) => {
            state.resort_list.push(action.payload);
        },
        remove_fav: (state, action) => {
            let idx = state.resorts.findIndex((r) => r.name === action.payload.name);
            let inner_idx = state.resorts[idx].usr_fav_list.findIndex((r) => r.email === action.payload.email);
            state.resorts[idx].usr_fav_list.splice(inner_idx, 1);
            state.resorts[idx].fav_num -= 1;
        }
    },
})

export const getResortDB = () => {
    return function (dispatch, getState) {
        
        dispatch(set_loading(true));

        if (getState().weather.resorts.length == 8) {
            dispatch(set_loading(false));
            return; 
        }

        dispatch(set_list([]));  

        const utah_resorts = ["alta", "brighton", "snowbird", "parkcity", "brianhead", "solitude", "deer-valley", "snowbasin"];
        let grade;
        r_list
        .get()
        .then((docs) => {

            // Highest Temperature: {resort.weather.temperature.max
            // Condition: {resort.weather.conditions}
            // {resort.name} Resort, Utah {resort.open ? "Opened" : "Closed"}
            docs.forEach((d) => {
                let add_item = {};

                const options = {
                    url: `https://liftie.info/api/resort/${d.data().api}`,
                    method: "GET",
                };

                axios(options)
                .then((res) => {
                    //dispatch(add_resort_list(res.data))
                    
                    // grade function
                    // using open, snowing, temperature
                    // res.data.weather
                    if (res.data.weather === undefined || res.data.weather === null) {
                        grade = "F";
                    }

                    if (grade != "F") {
                        // Is it open?
                        console.log("HelloHello")
                        let temp;
                        temp = parseInt(res.data.weather.temperature.max);
                        if (res.data.open == true) {
                            grade = "F";
                        }
                        else {
                            // Is it snowing?
                            if (!res.data.weather.conditions.includes("now")) {
                                // Temperature
                                if (temp > 40) {
                                    grade = "F";
                                }
                                else if (temp >= 36) {
                                    grade = "D";
                                }
                                else {
                                    grade = "C";
                                }
                            }
                            else {
                                if (temp > 40) {
                                    grade = "D";
                                }
                                else if (temp >= 36) {
                                    grade = "D";
                                }
                                else if (temp >= 31) {
                                    grade = "C";
                                }
                                else if (temp >= 0 && temp <= 25) {
                                    grade = "A";
                                }
                                else {
                                    grade = "B";
                                }            
                            }
                        }
                    }
                    
                    
                    add_item = { ...d.data(), ...res.data, id: d.id, grade: grade}

                    dispatch(set_resorts(add_item));
                })
            })
        })

        // resorts that do not have weather info
        // alta, park city, soliditude
        // utah_resorts.forEach((resort) => {
        //     const options = {
        //         url: `https://liftie.info/api/resort/${resort}`,
        //         method: "GET",
        //     };

        //     axios(options)
        //     .then((res) => {
        //         dispatch(add_resort_list(res.data));
        //     })
        //     .catch((err) => console.log(err))
        // })

        dispatch(set_loading(false));
    }
}

// Action creators are generated for each case reducer function
export const { set_list, set_loading, add_resort_list, set_resorts, add_fav, remove_fav } = weatherSlice.actions;

export default weatherSlice.reducer