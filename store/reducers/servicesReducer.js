import * as Action from "../types";

const initialState = {
    categories: [],
    shops: [],
    services: [],
    queuesHistory: [],
    queue: [],
    isLoading: true,
    userData: null,
    userToken: null,
    isLogin: false,
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
            }
        case Action.GET_SHOPS:
            return {
                ...state,
                shops: action.payload,
                isLoading: false,
            }
        case Action.GET_SERVICES:
            return {
                ...state,
                services: action.payload,
                isLoading: false,
            }
        case Action.SET_QUEUES:
            return {
                ...state,
                queuesHistory: action.payload,
                isLoading: false,
            }
        case Action.SET_QUEUE:
            return {
                ...state,
                queue: action.payload,
                isLoading: false,
            }
        case Action.SET_LOADING:
            return {
                ...state,
                isLoading: action.data,
            }
        case Action.SET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
                isLoading: false,
            }
        case Action.SET_USER_TOKEN:
            return {
                ...state,
                userToken: action.payload,
                isLogin: true,
                isLoading: false,
            }
        case Action.SET_USER_DATA_TOKEN:
            return {
                ...state,
                userData: action.data,
                userToken: action.token,
                isLogin: true,
                isLoading: false,
            }
        case Action.USER_ERROR:
            console.log(action.payload);
            return {
                ...state
            }
        case Action.USER_LOGOUT:
            return {
                ...state,
                isLogin: false,
                userData: null,
                userToken: null,
                isLoading: false,
            }
        default:
            return state;
    }
}

export default serviceReducer;