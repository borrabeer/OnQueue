import * as Action from "../types";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const BaseURL = "onqueue-api.herokuapp.com"
export const getCategories = () => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/categories`)
            .then(data => {
                dispatch({
                    type: Action.GET_CATEGORIES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.CATEGORIES_ERROR
                })
            })
    }
}

export const getShops = (category_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/${category_id}`)
            .then(data => {
                dispatch({
                    type: Action.GET_SHOPS,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SHOPS_ERROR
                })
            })
    }
}

export const getServices = (shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/${shop_id}`)
            .then(data => {
                dispatch({
                    type: Action.GET_SERVICES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: Action.SERVICES_ERROR
                })
            })
    }
}

export const getUserToken = (id) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/api/token/`, {
            username: id,
            password: id,
        })
            .then(async (data) => {
                if (data.status === 200) {
                    await AsyncStorage.setItem("@OnQueue_Token", JSON.stringify(data.data.access));
                    const token = await AsyncStorage.getItem("@OnQueue_Token");
                    dispatch({
                        type: Action.SET_USER_TOKEN,
                        payload: data.data.access
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const getUserData = (id, email, name, image) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/user/checkuser/`, {
            id: id,
            email: email,
            name: name,
            image: image,
        })
            .then(data => {
                dispatch({
                    type: Action.SET_USER_DATA,
                    payload: data.data
                })
            }).catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const validateUserToken = (token) => {
    return (dispatch) => {
        console.log("validateUserToken : " + token)
        Axios.get(`https://${BaseURL}/api/token/verify/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: Action.SET_USER_DATA_TOKEN,
                    data: data.data,
                    token: token
                })
            }).catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const createBookingQueue = (token, service_id) => {
    return (dispatch) => {
        console.log("createBookingQueue : " + token);
        Axios.post(`https://${BaseURL}/services/queue/book/${service_id}/`, {}, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                console.log("createBookingQueue : " + data);
                // dispatch({
                //     type: Action.SET_USER_DATA,
                //     payload: data.data
                // })
            })
            .catch(e => {
                dispatch({
                    type: Action.USER_ERROR,
                    payload: e
                })
            })
    }
}

export const setLoading = (bool) => {
    return {
        type: Action.SET_LOADING,
        data: bool
    }
}

export const userLogout = () => {
    return async (dispatch) => {
        await AsyncStorage.clear();
        dispatch({
            type: Action.USER_LOGOUT
        })
    }
}