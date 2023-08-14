//hacemos un hook para manejar todo lo relacionado al store del UI
//Aca hacemos toda la implementacion de UI, manejamos todos los metodos

import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

  const dispatch = useDispatch();
  const {isDateModalOpen} = useSelector(state => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  }

  const toggleDateModal = () => {
    (isDateModalOpen)
     ? closeDateModal()
     : openDateModal();
  }
  

  return {
    //propiedades
    isDateModalOpen,

    //metodos
    openDateModal,
    closeDateModal,
    toggleDateModal
  }

}