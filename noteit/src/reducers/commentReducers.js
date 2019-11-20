import {
    GET_COMMENTS,
    ADD_COMMENT,
    LOADING_COMMENTS
} from "../actions/types";

const initialState = {
    comments: [],
    loading: false,
    comment: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload.data,
                loading: false
            };
        case ADD_COMMENT:
            return {
                ...state,
                comment: action.payload
            };
        case LOADING_COMMENTS:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}