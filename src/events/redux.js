import _ from "lodash";
import {
  create as createUserEvent,
  get as getUserEvents,
  destroy as deleteUserEvent
} from "../common/api/events";
export const UPDATING_EVENTS = "UPDATING_EVENTS";
export const UPDATING_EVENTS_SUCCESS = "UPDATING_EVENTS_SUCCESS";
export const UPDATING_EVENTS_ERROR = "UPDATING_EVENTS_ERROR";
export const CREATING_EVENT = "CREATING_EVENT";
export const CREATING_EVENT_SUCCESS = "CREATING_EVENT_SUCCESS";
export const CREATING_EVENT_ERROR = "CREATING_EVENT_ERROR";
export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_ERROR = "DELETE_EVENT_ERROR";

const initialState = {
  events: [],
  updating: false,
  error: null,
  loadedBefore: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATING_EVENTS:
      return { ...state, updating: true };
    case UPDATING_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.events,
        updating: false,
        loadedBefore: true
      };
    }
    case UPDATING_EVENTS_ERROR: {
      return { ...state, error: action.error, updating: false };
    }
    case CREATING_EVENT:
      return { ...state, updating: true };
    case CREATING_EVENT_SUCCESS: {
      const events = state.events.events;
      events.push(action.event);
      return {
        ...state,
        events,
        updating: false
      };
    }
    case CREATING_EVENT_ERROR: {
      return { ...state, error: action.error, updating: false };
    }
    case DELETE_EVENT: {
      return { ...state, updating: true };
    }
    case DELETE_EVENT_SUCCESS: {
      const deletedEventId = action.deletedEventId;
      return {
        ...state,
        updating: false,
        events: _.remove(state.events, event => {
          return !(event.id === deletedEventId);
        })
      };
    }

    case DELETE_EVENT_ERROR: {
      return { ...state, error: action.error, updating: false };
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

const creatingEvent = () => ({
  type: CREATING_EVENT
});
const creatingEventSuccess = event => ({
  type: CREATING_EVENT_SUCCESS,
  event
});
const creatingEventError = error => ({
  type: CREATING_EVENT_ERROR,
  error
});
const deletingEvent = () => ({
  type: DELETE_EVENT
});
const deletingEventSuccess = deletedEventId => ({
  type: DELETE_EVENT_SUCCESS,
  deletedEventId
});
const deletingEventError = error => ({
  type: DELETE_EVENT_ERROR,
  error
});

export const updateEvents = id => {
  return async dispatch => {
    dispatch(updatingEvents());
    try {
      const events = await getUserEvents(id);
      dispatch(updatingEventsSuccess(events));
    } catch (e) {
      dispatch(updatingEventsError(e));
    }
  };
};

export const createEvent = eventObject => {
  return async dispatch => {
    dispatch(creatingEvent());
    try {
      const { title, start, end, userId } = eventObject;
      const event = await createUserEvent(title, start, end, userId);
      dispatch(creatingEventSuccess(event));
    } catch (e) {
      dispatch(creatingEventError(e));
    }
  };
};

export const deleteEvent = id => {
  return async dispatch => {
    dispatch(deletingEvent());
    try {
      const deletedEventId = await deleteUserEvent(id);
      dispatch(deletingEventSuccess(deletedEventId));
    } catch (e) {
      dispatch(deletingEventError(e));
    }
  };
};
