import { useSelector, useDispatch } from 'react-redux'
import { themeID } from '../slice/theme-slices/themeSlice';
import { useModalOperation } from '../../utils/component-utils/modalOperation';
import StatusBar from '../common/StatusBar';
import DockWrapper from '../common/DockWrapper';
import Button from '../common/Button';
import TestPanel from '../widgets/panel-docking/panels/TestPanel';
import TestPanel2 from '../widgets/panel-docking/panels/TestPanel2';

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
            <DockWrapper>
                <TestPanel/>
                <TestPanel2/>
            </DockWrapper>
            <StatusBar/>
        </div>
    );
}