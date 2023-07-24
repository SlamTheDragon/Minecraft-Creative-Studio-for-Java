import { createSlice } from '@reduxjs/toolkit'

export const themeBoolSlice = createSlice({
    name: 'themeSwitcher',
    initialState: {
        value: false,
    },
    reducers: {
        toggleLight: (state) => {
            state.value = false
        },
        toggleDark: (state) => {
            state.value = true
        }
    },
})

export const { toggleLight, toggleDark } = themeBoolSlice.actions

export const themeBoolean = (state: { themeBool: { value: boolean } }) => state.themeBool.value

export default themeBoolSlice.reducer