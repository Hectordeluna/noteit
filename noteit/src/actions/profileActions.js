import axios from "axios";

import {
  GET_USER_PROFILE,
  USER_LOADING
} from "./types";

export const getUser = id => dispatch => {
  dispatch(setUserLoading);
  axios.get(`/api/users/${id}`).then (res => 
    dispatch ({
      type: GET_USER_PROFILE,
      payload: res.data
    })
  );
}

export const setUserLoading = user => {
  return {
    type: USER_LOADING
  };
};