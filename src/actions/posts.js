
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from "../constants/actionTypes.js";
import * as api from "../api";

//Action Creators
export const getPosts = () => async(dispatch) => {
  try{
    //response recieved from an api in the form of an object which is called data
    const {data} = await api.fetchPosts();

    dispatch( { type: FETCH_ALL, payload: data } ); //dispatch( {in here is the action object} )
  }
  catch(error){
    console.log(error.message);
  }
}
//taking function as a parameter : in thunk
export const createPost = (post) => async (dispatch) => {
  try{
    const { data } = await api.createPost(post);

    dispatch( {type: CREATE, payload: data} ); //dispatch( {in here is the action object} )
  }
  catch(error){
    console.log(error.message);
  }
}

export const updatePost = (id, post) => async(dispatch) => {
  try{
    const {data} = await api.updatePost(id, post); //returns url and updatedPost
    dispatch({ type: UPDATE, payload:data });
  }
  catch(error){
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try{
    await api.deletePost(id);
    dispatch({ type: DELETE, payload:id });
  }
  catch(error){
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try{
    const {data} = await api.likePost(id);
    dispatch({ type: LIKE , payload: data });
  }
  catch(error){
    console.log(error);
  }
}
