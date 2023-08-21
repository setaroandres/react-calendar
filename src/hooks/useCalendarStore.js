import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";

//En este hokk creamos las acciones para hacer dispatch de las acciones

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const {events, activeEvent} = useSelector(state => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const startSavingEvent = async(calendarEvent) => {
    try {
      //Todo bien
    if (calendarEvent.id) {
      //Actualizamos
      await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
      dispatch(onUpdateEvent({...calendarEvent, user}));
      return;
    }
      //Creamos
      const {data} = await calendarApi.post('/events', calendarEvent);
      //console.log({data})
      dispatch(onAddNewEvent({...calendarEvent, id: data.eventoGuardado.id, user}));
    } catch (error) {
      console.log(error);
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  }

  const startDeletingEvent = async() => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());
    } catch (error) {
      console.log(error);
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }

  }

  const startLoadingEvents = async() => {
    try {

      const {data} = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      
    } catch (error) {
      console.log('Error cargando eventos');
      console.log(error);
    }
  }


  return {
    //Propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //Metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }

}