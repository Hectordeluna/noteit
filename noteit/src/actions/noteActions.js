import axios from "axios";

import {
  GET_NOTES,
  ADD_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  LOADING_NOTES,
  GET_NOTE
} from "./types";

export const getNotes = () => dispatch => {
  dispatch(setNotesLoading());
  axios.get('/api/note').then(res => 
      dispatch({
        type: GET_NOTES,
        payload: res.data
      })
    );
}

export const getNote = id => dispatch => {
  dispatch(setNotesLoading());
  axios.get('/api/note/' + id).then(res => 
      dispatch({
        type: GET_NOTE,
        payload: res.data
      })
    );
}

export const deleteNote = id => dispatch => {
  axios.delete('/api/note/' + id).then(res => 
      dispatch({
        type: DELETE_NOTE,
        payload: res.data
      })
    );
};

export const createNote = (note, history) => dispatch => {
  axios.post('/api/note', note).then(res => 
    history.push("/note/" + res.data._id)
  );
};

export const editNote = (id, note) => dispatch => {
  axios.put('/api/note/' + id, note).then(res => 
    dispatch({
      type: EDIT_NOTE,
      payload: res.data
    })
  );
};

export const setNotesLoading = note => {
  return {
    type: LOADING_NOTES
  };
};