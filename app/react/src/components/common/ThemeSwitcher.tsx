import { useDispatch, useSelector } from 'react-redux';
import { toggleDark, toggleLight } from '../slice/theme-slices/themeSlice';
import Button from './Button';
import { themeBoolean } from '../slice/theme-slices/themeBoolSlice';


export default function ThemeSwitcher() {
    const dispatch = useDispatch()

    const theme = window.localStorage.getItem("theme"); // FIXME: use config instead of storage
    const themeData = useSelector(themeBoolean)

    const rendering = themeData ? theme : themeData

    if (rendering) {
        return (
            <Button onClick={() => dispatch(toggleLight())}>🌙</Button>
        );
    } else {
        return (
            <Button onClick={() => dispatch(toggleDark())}>🌙</Button>
        );
    }

}