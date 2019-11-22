import {
  GET_USER_PROFILE,
  USER_LOADING
} from "../actions/types";

const initialState = {
  user: {},
  loading: false
}

export default function (state = initialState, action) {
  switch(action.type){
    case GET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case USER_LOADING:
      return {
        loading: true
      }
    default:
      return state;
  }
}
