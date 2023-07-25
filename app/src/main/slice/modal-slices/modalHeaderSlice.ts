import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export const modalHeaderSlice = createSlice({
    name: 'modalHeader',
    initialState: {
        value: 'loading',
    },
    reducers: {
        setHeader: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setHeader } = modalHeaderSlice.actions;

export const readHeader = (state: { modalHeader: { value: string, } }) => state.modalHeader.value

export default modalHeaderSlice.reducer;

