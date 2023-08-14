import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Ir a votar',
  notes: 'Poner voto en la urna',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '1',
    name: 'Andrés Setaro'
  }
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [
      tempEvent
    ],
    activeEvent: null
  },
  reducers: {
    //El payload es la info que recibimos del event, puede ser una nueva nota, un id, una const, etc
    onSetActiveEvent: (state, {payload}) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, {payload}) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, {payload}) => {
      state.events = state.events.map(event => {

        if (event._id === payload._id) {
          return payload;
        }
        return event;
      }) //el map retorna un nuevo evento basado en el evento original que se le pasa
    },
    onDeleteEvent: (state) => {
      if(state.activeEvent) {
        state.events = state.events.filter(event => event._id !== state.activeEvent._id);
        state.activeEvent = null;
      }

    }
  }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;