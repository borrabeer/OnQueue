import { GET_CATEGORIES, CATEGORIES_ERROR, GET_SHOPS, SHOPS_ERROR, SET_LOADING, GET_SERVICES, SERVICES_ERROR, GET_USER_DATA, SET_USER_DATA, GET_USER_TOKEN, SET_USER_TOKEN, USER_ERROR } from "../types";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
const BaseURL = "onqueue-api.herokuapp.com"
export const getCategories = () => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/categories`)
            .then(data => {
                dispatch({
                    type: GET_CATEGORIES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: CATEGORIES_ERROR
                })
            })
    }
}

export const getShops = (category_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/shops/${category_id}`)
            .then(data => {
                dispatch({
                    type: GET_SHOPS,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: SHOPS_ERROR
                })
            })
    }
}

export const getServices = (shop_id) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/services/${shop_id}`)
            .then(data => {
                dispatch({
                    type: GET_SERVICES,
                    payload: data.data
                })
            })
            .catch(() => {
                dispatch({
                    type: SERVICES_ERROR
                })
            })
    }
}

export const getUserToken = (id, email) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/api/token/`, {
            username: id,
            password: id,
        })
            .then(async (data) => {
                if (data.status === 200) {
                    await AsyncStorage.setItem("@OnQueue_Token", JSON.stringify(data.data));
                    const token = await AsyncStorage.getItem("@OnQueue_Token");
                    console.log(JSON.parse(token));
                    dispatch({
                        type: SET_USER_TOKEN,
                        payload: data.data
                    })
                }
            })
            .catch(e => {
                dispatch({
                    type: USER_ERROR,
                    payload: e
                })
            })
    }
}

export const getUserData = (id, email) => {
    return (dispatch) => {
        Axios.post(`https://${BaseURL}/user/checkuser/`, {
            id: id,
            email: email
        })
            .then(data => {
                dispatch({
                    type: SET_USER_DATA,
                    payload: data.data
                })
            }).catch(e => {
                dispatch({
                    type: USER_ERROR,
                    payload: e
                })
            })
    }
}

export const validateUserToken = (token) => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/api/token/verify/`, {
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
            .then(data => {
                dispatch({
                    type: SET_USER_DATA,
                    payload: data.data
                })
                dispatch({
                    type: SET_USER_TOKEN,
                    payload: token
                })
            }).catch(e => {
                dispatch({
                    type: USER_ERROR,
                    payload: e
                })
            })
    }
}

export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        data: bool
    }
}