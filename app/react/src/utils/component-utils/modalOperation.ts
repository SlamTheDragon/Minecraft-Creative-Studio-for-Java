import { useDispatch } from "react-redux";
import { openModal } from "../../components/slice/modal-slices/modalSlice";
import { setHeader } from "../../components/slice/modal-slices/modalHeaderSlice";
import { selectInterface } from "../../components/slice/modal-slices/modalInterfaceSlice";

export function useModalOperation() {
    const dispatch = useDispatch();

    const modalOperation = (modalTitle: string, modalInterfaceID: number) => {
        dispatch(openModal())
        dispatch(setHeader(modalTitle))
        dispatch(selectInterface(modalInterfaceID))
    };

    return modalOperation;
}