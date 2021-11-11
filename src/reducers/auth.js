//reducer is a pure function that takes in previous state and action and returns new state and action

import { AUTH, LOGOUT } from "../constants/actionTypes.js";

const authReducer = (state = {authData:null}, action) => {
  switch(action.type){
    case AUTH :
       localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
       return { ...state, authData: action?.data};
    case LOGOUT:
       localStorage.clear();
       return {...state, authData: null};

    default:
       return state;
  }
}

export default authReducer;
