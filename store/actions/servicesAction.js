import { GET_CATEGORIES, CATEGORIES_ERROR, GET_SHOPS, SHOPS_ERROR } from "../types";
import Axios from "axios";
const BaseURL = "onqueue-app.herokuapp.com"
export const getCategories = () => {
    return (dispatch) => {
        Axios.get(`https://${BaseURL}/api/categories`)
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
        Axios.get(`https://${BaseURL}/api/shops/${category_id}`)
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