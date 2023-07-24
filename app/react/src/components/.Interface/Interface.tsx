import { useSelector, useDispatch } from 'react-redux'
import { themeID } from '../slice/theme-slices/themeSlice';
import { useModalOperation } from '../../utils/component-utils/modalOperation';
import StatusBar from '../common/StatusBar';
import PanelWrapper from '../common/PanelWrapper';

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get
    const theme = useSelector(themeID)
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()


    return (
        <div className="interface">
            <PanelWrapper/>
            <StatusBar/>
        </div>
    );
}