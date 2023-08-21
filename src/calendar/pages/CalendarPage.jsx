import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useEffect, useState } from 'react';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, NavBar } from "../";
import { getMessagesES, localizer } from '../../helpers';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';

export const CalendarPage = () => {

  const {user} = useAuthStore();
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore();

  const eventStyleGetter = (event, start, date, isSelected) => {

    const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: '0.8',
      color: 'white'
    }

    //Si lo retornamos como un ibj cuando lo necesitemmos lo podemos desestructurar del metodo en el que está incluido
    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    //console.log({onDoubleClick: event})
    openDateModal();
  }
  
  const onSelect = (event) => {
    //console.log({click: event})
    setActiveEvent(event);
  }
  
  const onViewChanged = (event) => {
    //console.log({viewChange: event});
    localStorage.setItem('lastView', event);
    setLastView(event);
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        defaultView={lastView}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        /**Podemos sobreescribir componentes.*/
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />

      <FabAddNew />
      <FabDelete />
    </>
  )
}
