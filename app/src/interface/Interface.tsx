import '../index.scss'
import './Interface.scss'
import Button from "../components/common/Button/Button"
import { useNavigate } from "react-router-dom";
import StatusBar from '../components/bars/StatusBar';


export default function Interface() {
    const history = useNavigate();

    let handleClick = () => {
        history('/playground');
    };
    
    return (
        <>
            <div className='viewport'>
                <div className='card panel'>
                    <h1>The Editor in Question</h1>
                    <Button classItem={"btn primary"} onclick={handleClick}>Theme PlayGround</Button>
                </div>

            </div>
            <StatusBar/>
        </>
    );
}