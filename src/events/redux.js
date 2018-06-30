export const UPDATING_EVENTS = "UPDATING_EVENTS";
export const UPDATING_EVENTS_SUCCESS = "UPDATING_EVENTS_SUCCESS";
export const UPDATING_EVENTS_ERROR = "UPDATING_EVENTS_ERROR";

const initialState = {
  events: null,
  updating: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATING_EVENTS:
      return { ...state, updating: true };
    case UPDATING_EVENTS_SUCCESS: {
      return { ...state, events: action.events };
    }
    case UPDATING_EVENTS_ERROR: {
      return { ...state, error: action.error };
    }
    default:
      return state;
  }
};

const updatingEvents = () => ({
  type: UPDATING_EVENTS
});
const updatingEventsSuccess = events => ({
  type: UPDATING_EVENTS_SUCCESS,
  events
});
const updatingEventsError = error => ({
  type: UPDATING_EVENTS_ERROR,
  error
});

export const updateEvents = () => {
  return dispatch => {
    dispatch(updatingEvents);
    try {
      // api call
      // dispatch(updatingEventsSuccess())
    } catch (e) {
      dispatch(updatingEventsError(e));
    }
  };
};
