import axios from "axios";

import {
  GET_COMMENTS,
  ADD_COMMENT,
  LOADING_COMMENTS
} from "./types";

export const getComments = id => dispatch => {
  dispatch(setCommentsLoading());
  axios.get('/api/'+id+'/comments',{withCredentials: true}).then(res => 
      dispatch({
        type: GET_COMMENTS,
        payload: {
            data: res.data,
            id: id,
        }
      })
    );
}

export const createComment = (id, comment) => dispatch => {
  axios.post('/api/'+id+'/comment', comment).then(res =>   
    dispatch({
        type: ADD_COMMENT,
        payload: {
          data: res.data,
          id: id
        }
    })
    );
};

export const setCommentsLoading = comment => {
  return {
    type: LOADING_COMMENTS
  };
};