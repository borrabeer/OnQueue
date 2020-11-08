import { GET_CATEGORIES, GET_SHOPS, SET_LOADING, GET_SERVICES } from "../types";

const initialState = {
    categories: [],
    shops: [],
    services: [],
    isLoading: true,
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
        default:
            return state;
    }
}

export default serviceReducer;