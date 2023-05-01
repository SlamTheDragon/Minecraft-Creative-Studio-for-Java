// import ThemeSwitcher from '../custom/ThemeSwitcher/ThemeSwitcher';
import ThemeSwitcher from '../custom/ThemeSwitcher/ThemeSwitcher';
import './StatusBar.scss'

export default function StatusBar() {
    const status = "Minecraft Studio Pre-Deveopment Snapshot (v0.0.1) - You are currently viewing ThemePlayground (Default Router Landing)"

    return(
        <>
            <div className="statusbar">
                <span>{status}</span>
                <ThemeSwitcher/>
            </div>
        </>
    );
}