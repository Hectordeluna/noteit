import {
    GET_NOTES,
    ADD_NOTE,
    DELETE_NOTE,
    EDIT_NOTE,
    LOADING_NOTES,
    GET_NOTE,
} from "../actions/types";

const initialState = {
    notes: [],
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_NOTES:
            return {
                ...state,
                notes: action.payload,
                loading: false
            };
        case DELETE_NOTE:
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload),
            };
        case ADD_NOTE:
            return {
                ...state,
                notes: [action.payload, ...state.notes]
            };
        case LOADING_NOTES:
            return {
                ...state,
                loading: true
            };
        case GET_NOTE:
            return {
                ...state,
                notes: action.payload,
                loading: false
            };
        case EDIT_NOTE:
            return {
                ...state,
                notes: action.payload
            };
        default:
            return state;
    }
}