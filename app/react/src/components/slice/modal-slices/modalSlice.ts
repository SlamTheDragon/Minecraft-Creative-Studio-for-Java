import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: false,
    },
    reducers: {
        openModal: (state) => {
            state.value = true

            document.body.classList.add('disable-events');
            const outsideElements = document.querySelectorAll('button, div, a'); // perhaps turn this into an array? | make this unnecessarily complicated? xd
            outsideElements.forEach((element) => {
                element.setAttribute('tabindex', '-1');
            });
        },
        closeModal: (state) => {
            state.value = false

            const outsideElements = document.querySelectorAll('button, div, a');
            outsideElements.forEach((element) => {
                element.removeAttribute('tabindex');
            });
        }
    },
})

export const { openModal, closeModal } = modalSlice.actions

export const modalState = (state: { modal: { value: boolean } }) => state.modal.value

export default modalSlice.reducer