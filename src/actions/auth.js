import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index";

export const signin = (formData, history) => async (dispatch) => {
  try{
    //log in the user
    const { data } = await api.signIn(formData);
    dispatch({ type:AUTH, data});
    history.push("/"); //navigate the user to the homepage
  }
  catch(error){
     console.log(error)
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};
