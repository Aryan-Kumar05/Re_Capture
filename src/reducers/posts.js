//here state = posts
//reducer will be called as soon as dispatch function is executed
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes.js";
export default (posts = [], action) => {
  switch(action.type){
    case LIKE :
       return posts.map( (post) => (post._id === action.payload._id) ? action.payload : post);

    case DELETE:
       return posts.filter( (post) => post._id !== action.payload);

    case UPDATE:
       return posts.map( (post) => (post._id === action.payload._id) ? action.payload : post);

    case FETCH_ALL:
       return action.payload;

    case CREATE :
       return [...posts, action.payload];

    default:
       return posts
  }
}
