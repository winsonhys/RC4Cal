import _ from "lodash"
import {
  create as createUserEvent,
  get as getUserEvents,
  destroy as deleteUserEvent,
  update as updateUserEvent,
  requestSwap as requestSwapEmail,
  eventSwap as eventSwapApi,
} from "../common/api/events"
export const UPDATING_EVENTS = "UPDATING_EVENTS"
export const UPDATING_EVENTS_SUCCESS = "UPDATING_EVENTS_SUCCESS"
export const UPDATING_EVENTS_ERROR = "UPDATING_EVENTS_ERROR"
export const CREATING_EVENT = "CREATING_EVENT"
export const CREATING_EVENT_SUCCESS = "CREATING_EVENT_SUCCESS"
export const CREATING_EVENT_ERROR = "CREATING_EVENT_ERROR"
export const DELETE_EVENT = "DELETE_EVENT"
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS"
export const DELETE_EVENT_ERROR = "DELETE_EVENT_ERROR"
export const EDITING_EVENT = "EDITING_EVENT"
export const EDITING_EVENT_SUCCESS = "EDITING_EVENT_SUCCESS"
export const EDITING_EVENT_ERROR = "EDITING_EVENT_ERROR"
export const REQUESTING_SWAP = "REQUESTING_SWAP"
export const REQUESTING_SWAP_SUCCESS = "REQUESTING_SWAP_SUCCESS"
export const REQUESTING_SWAP_ERROR = "REQUESTING_SWAP_ERROR"
export const EVENT_SWAPPING = "EVENT_SWAPPING"
export const EVENT_SWAPPING_SUCCESS = "EVENT_SWAPPING_SUCCESS"
export const EVENT_SWAPPING_ERROR = "EVENT_SWAPPING_ERROR"

const initialState = {
  events: [],
  updating: false,
  error: null,
  sendingEmail: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATING_EVENTS:
      return { ...state, updating: true }
    case UPDATING_EVENTS_SUCCESS: {
      return {
        ...state,
        events: action.events,
        updating: false,
      }
    }
    case UPDATING_EVENTS_ERROR: {
      return { ...state, error: action.error, updating: false }
    }
    case EDITING_EVENT: {
      return { ...state, updating: true }
    }
    case EDITING_EVENT_SUCCESS: {
      const eventIndex = _.findIndex(
        state.events,
        (event) => (event.id = action.editedEvent.id)
      )
      state.events[eventIndex] = action.editedEvent
      return { ...state }
    }
    case EDITING_EVENT_ERROR: {
      return { ...state, error: action.error }
    }
    case CREATING_EVENT:
      return { ...state, updating: true }
    case CREATING_EVENT_SUCCESS: {
      const events = state.events
      events.push(action.event)
      return {
        ...state,
        events,
        updating: false,
      }
    }
    case CREATING_EVENT_ERROR: {
      return { ...state, error: action.error, updating: false }
    }
    case DELETE_EVENT: {
      return { ...state, updating: true }
    }
    case DELETE_EVENT_SUCCESS: {
      const deletedEventId = action.deletedEventId
      return {
        ...state,
        updating: false,
        events: _.remove(state.events, (event) => {
          return !(event.id === deletedEventId)
        }),
      }
    }

    case DELETE_EVENT_ERROR: {
      return { ...state, error: action.error, updating: false }
    }
    case REQUESTING_SWAP: {
      return { ...state, sendingEmail: true }
    }
    case REQUESTING_SWAP_SUCCESS: {
      return { ...state, sendingEmail: false }
    }
    case REQUESTING_SWAP_ERROR: {
      return { ...state, sendingEmail: false, error: action.error }
    }
    default:
      return state
  }
}

const updatingEvents = () => ({
  type: UPDATING_EVENTS,
})
const updatingEventsSuccess = (events) => ({
  type: UPDATING_EVENTS_SUCCESS,
  events,
})
const updatingEventsError = (error) => ({
  type: UPDATING_EVENTS_ERROR,
  error,
})

const creatingEvent = () => ({
  type: CREATING_EVENT,
})
const creatingEventSuccess = (event) => ({
  type: CREATING_EVENT_SUCCESS,
  event,
})
const creatingEventError = (error) => ({
  type: CREATING_EVENT_ERROR,
  error,
})
const deletingEvent = () => ({
  type: DELETE_EVENT,
})
const deletingEventSuccess = (deletedEventId) => ({
  type: DELETE_EVENT_SUCCESS,
  deletedEventId,
})
const deletingEventError = (error) => ({
  type: DELETE_EVENT_ERROR,
  error,
})
const editingEvent = () => ({
  type: EDITING_EVENT,
})

const editingEventSuccess = (editedEvent) => ({
  type: EDITING_EVENT_SUCCESS,
  editedEvent,
})

const editingEventError = (error) => ({
  type: EDITING_EVENT_ERROR,
  error,
})
const requestingSwap = () => ({
  type: REQUESTING_SWAP,
})
const requestingSwapSuccess = () => ({
  type: REQUESTING_SWAP_SUCCESS,
})
const requestingSwapError = (error) => ({
  type: REQUESTING_SWAP_ERROR,
  error,
})

const eventSwapping = () => ({
  type: EVENT_SWAPPING,
})

const eventSwappingSuccess = () => ({
  //API has a payload, just that I never use. Consider using.
  type: EVENT_SWAPPING_SUCCESS,
})

const eventSwappingError = (error) => ({
  type: EVENT_SWAPPING_ERROR,
  error,
})

export const requestSwap = (eventIdFrom, eventIdTo) => {
  return async (dispatch) => {
    dispatch(requestingSwap())
    try {
      await requestSwapEmail(eventIdFrom, eventIdTo)
      dispatch(requestingSwapSuccess())
    } catch (e) {
      dispatch(requestingSwapError(e))
    }
  }
}
export const eventSwap = (eventIdFrom, eventIdTo) => {
  return async (dispatch) => {
    dispatch(eventSwapping())
    try {
      await eventSwapApi(eventIdFrom, eventIdTo)
      dispatch(eventSwappingSuccess())
    } catch (e) {
      dispatch(eventSwappingError(e))
    }
  }
}
export const updateEvents = (id) => {
  return async (dispatch) => {
    dispatch(updatingEvents())
    try {
      const events = await getUserEvents(id)
      dispatch(updatingEventsSuccess(events))
    } catch (e) {
      dispatch(updatingEventsError(e))
    }
  }
}

export const editEvent = (id, eventObject) => {
  return async (dispatch) => {
    dispatch(editingEvent())
    try {
      const event = await updateUserEvent({
        id,
        ...eventObject,
      })
      dispatch(editingEventSuccess(event))
    } catch (e) {
      dispatch(editingEventError(e))
    }
  }
}

export const createEvent = (eventObject) => {
  return async (dispatch) => {
    dispatch(creatingEvent())
    try {
      const { title, start, end, userId, type, allDay, location } = eventObject
      const event = await createUserEvent(
        title,
        start,
        end,
        userId,
        type,
        allDay,
        location
      )
      dispatch(creatingEventSuccess(event))
    } catch (e) {
      dispatch(creatingEventError(e))
    }
  }
}

export const deleteEvent = (id) => {
  return async (dispatch) => {
    dispatch(deletingEvent())
    try {
      const deletedEventId = await deleteUserEvent(id)
      dispatch(deletingEventSuccess(deletedEventId))
    } catch (e) {
      dispatch(deletingEventError(e))
    }
  }
}
