import '../../index.scss'
import ThemeSwitcher from './ThemeSwitcher';


export default function StatusBar() {
    // FIXME: Attatch to mouse to determine description
    const status = "Minecraft Studio Pre-Deveopment Snapshot (v0.0.1.1) - You are currently viewing ThemePlayground (Default Router Landing)"

    return (
        <>
            <div className="status-bar">
                <span>{status}</span>  <ThemeSwitcher/>
            </div>
        </>
    );
}