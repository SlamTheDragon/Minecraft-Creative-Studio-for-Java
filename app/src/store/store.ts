import { configureStore } from "@reduxjs/toolkit"
import modalReducer from "../components/slice/modal-slices/modalSlice"
import modalHeaderReducer from "../components/slice/modal-slices/modalHeaderSlice"
import modalInterfaceID from "../components/slice/modal-slices/modalInterfaceSlice"
import themeID from "../components/slice/theme-slices/themeSlice"
import themeBool from "../components/slice/theme-slices/themeBoolSlice"

export default configureStore({
    reducer: {
        modal: modalReducer,
        modalHeader: modalHeaderReducer,
        modalInterface: modalInterfaceID,
        theme: themeID,
        themeBool: themeBool,
    }
})

