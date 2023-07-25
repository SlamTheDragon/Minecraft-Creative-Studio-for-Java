import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export const modalInterfaceID = createSlice({
    name: 'modalInterface',
    initialState: {
        value: 0,
    },
    reducers: {
        selectInterface: (state, action: PayloadAction<number>) => {
            state.value = action.payload
        }
    }
})

export const { selectInterface } = modalInterfaceID.actions

export const readModalInterface = (state: { modalInterface: { value: number } }) => state.modalInterface.value

export default modalInterfaceID.reducer;