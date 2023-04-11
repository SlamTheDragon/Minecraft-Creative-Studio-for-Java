import ThemeSwitcher from '../custom/ThemeSwitcher/ThemeSwitcher';
import './StatusBar.scss'

export default function StatusBar() {
    const status = "the status go brrr"

    return(
        <>
            <div className="statusbar">
                <span>{status}</span>
                <ThemeSwitcher/>
            </div>
        </>
    );
}