import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../slice/modal-slices/modalSlice';
import modalHeaderReducer from '../slice/modal-slices/modalHeaderSlice';
import modalInterfaceID from "../slice/modal-slices/modalInterfaceSlice"
import themeID from "../slice/theme-slices/themeSlice"
import themeBool from "../slice/theme-slices/themeBoolSlice"

export default configureStore({
	reducer: {
		modal: modalReducer,
		modalHeader: modalHeaderReducer,
		modalInterface: modalInterfaceID,
		theme: themeID,
		themeBool,
	},
});
