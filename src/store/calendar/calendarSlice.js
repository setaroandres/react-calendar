import { createSlice } from '@reduxjs/toolkit';

// const tempEvent = {
//   _id: new Date().getTime(),
//   title: 'Ir a votar',
//   notes: 'Poner voto en la urna',
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: '#fafafa',
//   user: {
//     _id: '1',
//     name: 'Andrés Setaro'
//   }
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    isLoadingEvents: true,
    events: [
      //tempEvent
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

        if (event.id === payload.id) {
          return payload;
        }
        return event;
      }) //el map retorna un nuevo evento basado en el evento original que se le pasa
    },
    onDeleteEvent: (state) => {
      if(state.activeEvent) {
        state.events = state.events.filter(event => event.id !== state.activeEvent.id);
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, {payload = []}) => {
      state.isLoadingEvents = false,
      payload.forEach(event => {
        //si el evento ya existe en el store no lo agrego
        const exists = state.events.some(dbEvent => dbEvent.id === event.id);
        if(!exists) {
          state.events.push(event)
        }
      });
    },
    onLogOutCalendar: (state) => {
      state.isLoadingEvents = true,
      state.events = [],
      state.activeEvent = null
    }
  }
});


export const { 
  onSetActiveEvent, 
  onAddNewEvent, 
  onUpdateEvent, 
  onDeleteEvent, 
  onLoadEvents, 
  onLogOutCalendar 
} = calendarSlice.actions;