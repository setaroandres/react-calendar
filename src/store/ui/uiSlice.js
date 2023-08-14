//Ac vamos a mantener y manejar la informacion de estados del ui

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false
  },
  reducers: {
    //cuando queremos abrir el modal
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    //cuando queremos abrir el modal
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    }
  }
});


export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;