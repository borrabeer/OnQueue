import { GET_CATEGORIES, CATEGORIES_ERROR, GET_SHOPS, SHOPS_ERROR, SET_LOADING, GET_SERVICES, SERVICES_ERROR } from "../types";
import Axios from "axios";
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

export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        data: bool
    }
}