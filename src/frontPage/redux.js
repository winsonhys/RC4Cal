/* global sessionStorage*/
import { get as getUserBackend } from "../common/api/users"

export const GETTING_USER = "GETTING_USER"
export const GETTING_USER_SUCCESS = "GETTING_USER_SUCCESS"
export const GETTING_USER_ERROR = "GETTING_USER_ERROR"

const initialState = {
  user: null,
  token: null,
  getting: false,
  error: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return { ...state, getting: true }
    case GETTING_USER_SUCCESS: {
      sessionStorage.setItem("token", action.payload.token)
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        getting: false,
      }
    }
    case GETTING_USER_ERROR: {
      return { ...state, error: action.error, getting: false }
    }
    default:
      return state
  }
}

const gettingUser = () => ({
  type: GETTING_USER,
})
const gettingUserSuccess = (token) => ({
  type: GETTING_USER_SUCCESS,
  payload: token,
})
const gettingUserError = (error) => ({
  type: GETTING_USER_ERROR,
  error,
})

export const getUser = (username, password) => {
  return async (dispatch) => {
    dispatch(gettingUser())
    try {
      const userAndToken = await getUserBackend(username, password)
      return dispatch(gettingUserSuccess(userAndToken))
    } catch (e) {
      dispatch(gettingUserError(e))
    }
  }
}
