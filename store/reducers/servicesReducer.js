import { GET_CATEGORIES, GET_SHOPS, SET_LOADING, GET_SERVICES, SET_USER_DATA, USER_ERROR, SET_USER_TOKEN } from "../types";

const initialState = {
    categories: [],
    shops: [],
    services: [],
    isLoading: true,
    userData: null,
    userToken: null,
    isLogin: false,
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
            }
        case GET_SHOPS:
            return {
                ...state,
                shops: action.payload,
                isLoading: false,
            }
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                isLoading: false,
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.data,
            }
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
            }
        case SET_USER_TOKEN:
            return {
                ...state,
                userToken: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case USER_ERROR:
            console.log(action.data);
            return {
                ...state
            }
        default:
            return state;
    }
}

export default serviceReducer;