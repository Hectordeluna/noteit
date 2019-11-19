import { combineReducers } from "redux";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import noteReducers from "./noteReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  note: noteReducers
});