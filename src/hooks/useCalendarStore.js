import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";

//En este hokk creamos las acciones para hacer dispatch de las acciones

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async(calendarEvent) => {
    //TODO: llegar al backend

    //Todo bien
    if (calendarEvent._id) {
      //Actualizamos
      dispatch(onUpdateEvent({...calendarEvent}));
    } else {
      //Creamos
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }
  }

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  }


  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }

}