import { get as getUserBackend } from "../common/api/users";

export const GETTING_USER = "GETTING_USER";
export const GETTING_USER_SUCCESS = "GETTING_USER_SUCCESS";
export const GETTING_USER_ERROR = "GETTING_USER_ERROR";

const initialState = {
  user: null,
  getting: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETTING_USER:
      return { ...state, getting: true };
    case GETTING_USER_SUCCESS: {
      return { ...state, user: action.payload, getting: false };
    }
    case GETTING_USER_ERROR: {
      return { ...state, error: action.error, getting: false };
    }
    default:
      return state;
  }
};

const gettingUser = () => ({
  type: GETTING_USER
});
const gettingUserSuccess = user => ({
  type: GETTING_USER_SUCCESS,
  payload: user
});
const gettingUserError = error => ({
  type: GETTING_USER_ERROR,
  error
});

export const getUser = (username, password) => {
  return async dispatch => {
    dispatch(gettingUser());
    try {
      const user = await getUserBackend(username, password);
      return dispatch(gettingUserSuccess(user));
    } catch (e) {
      console.log(e);
      dispatch(gettingUserError(e));
    }
  };
};
