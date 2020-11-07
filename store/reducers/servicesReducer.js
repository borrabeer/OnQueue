import { GET_CATEGORIES, GET_SHOPS } from "../types";

const initialState = {
    categories: [],
    shops: [],
    services: []
}

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case GET_SHOPS:
            return {
                ...state,
                shops: action.payload
            }
        default:
            return state;
    }
}

export default serviceReducer;