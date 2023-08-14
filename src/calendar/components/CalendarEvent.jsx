
//Desestructuramos lo que necesitamos de las propiedades del evento
export const CalendarEvent = ({event}) => {
  //console.log(props);
  const {title, user} = event;
  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  )
}
