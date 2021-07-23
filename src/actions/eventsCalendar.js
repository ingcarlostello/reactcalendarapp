import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

// asincrona
export const eventStartAddNew = (event) => {
                          // permite obtener losdatos de redux
  return async (dispatch, getState) => {

    console.log(getState);
    const {uid, name} = getState().auth;

    try {
      const resp = await fetchConToken('events', event, 'POST');
      const body = await resp.json();
      
      if(body.ok){
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name
        }
        dispatch(addNewEventToCalendar(event))
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const addNewEventToCalendar = (event) => ({
  type: types.addNewEvent,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActiveEvent = () => ({type: types.eventClearActiveEvent})



// tarea asincrona
export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
      const body = await resp.json();

      if(body.ok){
        dispatch(eventUpdated(event));
      }else{
        Swal.fire('Error', body.msg, 'error');
      }
      // const events = prepareEvents(body.events)
    } catch (error) {
      console.log(error);
    }
  }
}
const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})




export const eventStartDelete = () => {
  return async (dispatch, getState) => {

    const {id} = getState().calendar.activeEvent

    try {
      const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
      const body = await resp.json();

      if(body.ok){
        dispatch(eventDeleted());
      }else{
        Swal.fire('Error', body.msg, 'error');
      }
      // const events = prepareEvents(body.events)
    } catch (error) {
      console.log(error);
    }
  }
}

const eventDeleted = () => ({
  type: types.eventDeleted
})



// tarea asincrona que obtiene los eventos de la BD que dispara una accion al reducer
export const eventStartLoading = () => {
  return async (dispatch) => {
    try {

      const resp = await fetchConToken('events');
      const body = await resp.json();
      const events = prepareEvents(body.events)

      dispatch(eventLoaded(events))
      
    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})


export const eventLogout = () => ({
  type: types.eventLogout
})