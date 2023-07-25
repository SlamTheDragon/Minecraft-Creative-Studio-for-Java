import { setHeader } from "main/slice/modal-slices/modalHeaderSlice";
import { selectInterface } from "main/slice/modal-slices/modalInterfaceSlice";
import { openModal } from "main/slice/modal-slices/modalSlice";
import { useDispatch } from "react-redux";

export function useModalOperation() {
    const dispatch = useDispatch();

    const modalOperation = (modalTitle: string, modalInterfaceID: number) => {
        dispatch(openModal())
        dispatch(setHeader(modalTitle))
        dispatch(selectInterface(modalInterfaceID))
    };

    return modalOperation;
}