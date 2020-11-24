import * as Action from "../types";

const initialState = {
    categories: [],
    shops: [],
    manageShops: [],
    editShop: null,
    services: [],
    manageServices: [],
    manageQueues: [],
    editService: null,
    queuesHistory: [],
    queue: [],
    isLoading: true,
    userData: null,
    userToken: null,
    isLogin: false,
    managers: [],
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
        case Action.SET_MANAGE_SHOP:
            return {
                ...state,
                manageShops: action.payload,
                isLoading: false,
            }
        case Action.SET_MANAGE_SERVICE:
            return {
                ...state,
                manageServices: action.payload,
                isLoading: false,
            }
        case Action.SET_MANAGE_QUEUE:
            return {
                ...state,
                manageQueues: action.payload,
                isLoading: false,
            }
        case Action.SET_MANAGER_USER:
            return {
                ...state,
                managers: action.payload,
                isLoading: false,
            }
        case Action.SET_EDIT_SHOP:
            return {
                ...state,
                editShop: action.payload,
                isLoading: false,
            }
        case Action.SET_EDIT_SERVICE:
            return {
                ...state,
                editService: action.payload,
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
                ...state,
                isLoading: false,
            }
        case Action.CATEGORIES_ERROR:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
            }
        case Action.QUEUE_ERRORS:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
            }
        case Action.SERVICES_ERROR:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
            }
        case Action.SHOPS_ERROR:
            console.log(action.payload);
            return {
                ...state,
                isLoading: false,
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