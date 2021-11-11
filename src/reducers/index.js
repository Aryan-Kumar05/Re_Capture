import { combineReducers } from "redux";
import posts from "./posts"; //reducers mai posts.js
import auth from "./auth"; //reducers mai auth.js

export default combineReducers({
  posts: posts,
  auth: auth
});
