import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import noteReducers from "./noteReducers";
import commentReducers from "./commentReducers";
import profileReducers from "./profileReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  note: noteReducers,
  comments: commentReducers,
  profile: profileReducers
});