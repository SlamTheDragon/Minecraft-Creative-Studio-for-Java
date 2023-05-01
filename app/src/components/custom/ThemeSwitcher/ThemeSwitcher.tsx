import { useEffect, useState } from 'react';
import { ReactComponent as DarkMode } from '@material-design-icons/svg/filled/dark_mode.svg';
import Button from '../../common/Button/Button';


export default function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => {
        const localThemeValue = window.localStorage.getItem("theme");
        return localThemeValue !== null ? localThemeValue : null;
    });

    useEffect(() => {
        if (theme !== null) {
            document.documentElement.setAttribute('data-theme', theme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        window.localStorage.setItem("theme", newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <Button classItem={'btn-b'} onclick={toggleTheme}>
            <DarkMode/>
        </Button>
    );
}