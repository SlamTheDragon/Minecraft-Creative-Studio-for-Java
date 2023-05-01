import Button from '../components/common/Button/Button';
import StatusBar from '../components/bars/StatusBar';
import ThemePlayground from '../components/panels/ThemePlayground';
import '../index.scss'
import './Interface.scss'


export default function Interface() {
    
    return (
        <>
            <div className='viewport'>
                <ThemePlayground/>
            </div>
            <StatusBar/>
        </>
    );
}