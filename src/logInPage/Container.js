const USERNAME_UPDATE_LOADING = "USERNAME_UPDATE_LOADING";
const USERNAME_UPDATE_SUCCESS = "USERNAME_UPDATE_SUCCESS";
const USERNAME_UPDATE_FAILURE = "USERNAME_UPDATE_FAILURE";

const initialState = {
  userNameLoading: false,
  userName: "",
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_UPDATE_LOADING:
      return { ...state, userNameLoading: true };
    case USERNAME_UPDATE_SUCCESS:
      return { ...state, userName: action.payload, userNameLoading: false };
    case USERNAME_UPDATE_FAILURE:
      return { ...state, userNameLoading: false, error: action.error };
    default:
      return state;
  }
};
