
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from '../actions/types'

const initialState = {
  token: localStorage.getItem("user"),
  isAuthenticated:null,
  isLoading:false,
  user:null
};

export default function(state = initialState,action){
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading:true 
      }
    case USER_LOADED:
      return {
        ...state,
        isLoading:false,
        isAuthenticated:true,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('user', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated:true,
        isLoading:false
      }
    // case AUTH_ERROR:
    // case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('user');
      return {
        ...state,
        isLoading:false,
        isAuthenticated:false,
        token:null,
        user:null,
      }
    default:
      return state;
  }
}