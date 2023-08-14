import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";
import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from "../../hooks";
registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%'
  },
};


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

  const {isDateModalOpen, closeDateModal} = useUiStore();
  const {activeEvent, startSavingEvent} = useCalendarStore();
  //const [isOpen, setIsOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  //Aca seteamos el state del formulario
  const [formValues, setFormValues] = useState({
    title: 'Andres',
    notes: 'Setaro',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  //Usamos un useMemos para memorizar el estado de is-invalid y asi poder poner el estilos necesario en el campo invalido
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return (formValues.title.length > 0)
           ? ''
           : 'is-invalid';

  }, [formValues.title, formSubmitted]);//Se vuelve a memorizar si estas dependencias cambian

  //Usamos este useEffect para cargar los datos cuando se abre el modal, por eso usamos un useEffect, para que se haga una sola vez cuando carga el componente
  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({...activeEvent});
    }
  }, [activeEvent])
  

  //Recibimos el event y desestructuramos el target, que es dnd tenemos los valores
  const onInputChange = ({target}) => {
    setFormValues({
      //aca hacemos el spread de todo el estado para no sobreescribir lo que no necesitamos, solo sobreescribimos los correspondientes al name que pasamos
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const onCloseModal = () => {
    closeDateModal();
  }

  const onSubmit = async(event) => {
    event.preventDefault();
    setFormSubmitted(true);

    //Validamos fecha inicial y fecha final. Si la dif es negativa no lo vamos a permitir
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }

    if (formValues.title.length <= 0) return;

    console.log(formValues);

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);//Para remover los posible mensajes de error que hayan quedado
  }
  
  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      classTimeoutMS={200}
    >
    <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>

          <div className="form-group mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker 
                selected={formValues.start}
                className="form-control"
                onChange={(event) => onDateChange(event, 'start')}
                dateFormat="Pp"
                showTimeSelect
                locale="es"
                timeCaption="Hora"
              />
          </div>

          <div className="form-group mb-2">
              <label>Fecha y hora fin</label>
              <DatePicker 
                selected={formValues.end}
                className="form-control"
                onChange={(event) => onDateChange(event, 'end')}
                dateFormat="Pp"
                showTimeSelect
                locale="es"
                minDate={formValues.start}
                timeCaption="Hora"
              />
          </div>

          <hr />
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChange}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>

          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>

      </form>  
    </Modal>
  )
}
