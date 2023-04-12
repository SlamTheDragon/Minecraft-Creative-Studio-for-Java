import { useState } from "react";
import Button from "../common/Button/Button";
import ThemeSwitcher from "../custom/ThemeSwitcher/ThemeSwitcher";
import Modal from "../common/Modal/Modal";
import { ReactComponent as Settings } from '@material-design-icons/svg/filled/settings.svg';
import { ReactComponent as Home } from '@material-design-icons/svg/filled/home.svg';
import { ReactComponent as Info } from '@material-design-icons/svg/outlined/info.svg';
import { useNavigate } from "react-router-dom";
import StatusBar from "../bars/StatusBar";

export default function ThemePlayground() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const history = useNavigate();

    let handleClick = () => {
        history('/');
    };

    const openModal = () => {
        setIsModalOpen(true);
        document.body.classList.add('disable-events');
        document.addEventListener('keydown', handleEscapeKeyPress);

        const outsideElements = document.querySelectorAll('button');
        outsideElements.forEach((element) => {
            element.setAttribute('tabindex', '-1');
        });
    };

    const handleEscapeKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.removeEventListener('keydown', handleEscapeKeyPress);

        const outsideElements = document.querySelectorAll('button');
        outsideElements.forEach((element) => {
            element.removeAttribute('tabindex');
        });
    };

    const handleMouseEnter = () => {
        document.body.classList.remove('disable-events');
    };


    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} onMouseEnter={handleMouseEnter}>
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
            </Modal>

            <div className="viewport" style={{ overflowY: "scroll" }}>

                <div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", padding: "50px", height: "40%" }}>
                    <h1>
                        Theming
                    </h1>
                    <p>
                        Theming process for the interface module of the application
                    </p>
                    <hr style={{ width: "100%" }} />
                    <span>function button(s):</span>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <ThemeSwitcher />
                        <Button classItem={'btn ctrl-btn'} onclick={openModal} ><Settings/></Button>
                        <Button classItem={"btn ctrl-btn"} onclick={handleClick} ><Home/></Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Button classItem={"btn ctrl-btn"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn primary"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn primary p-accent"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn secondary"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn secondary s-accent"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn warn"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn alert"}><Info/></Button>
                        <Button classItem={"btn ctrl-btn disabled"}><Info/></Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <span>click <strong>home</strong> to go back to the main view </span>
                    </div>
                </div>

                <div className="card" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button classItem={"btn primary"}>Primary</Button>
                    <Button classItem={"btn primary p-accent"}>Primary</Button>
                    <Button classItem={"btn secondary"}>Secondary</Button>
                    <Button classItem={"btn secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn warn"}>Warn</Button>
                    <Button classItem={"btn alert"}>Alert</Button>
                    <Button classItem={"btn"}>default</Button>
                    {/* <Button classItem={"btn disabled"}>Disabled</Button> */}
                </div>
                <div className="" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button classItem={"btn primary"}>Primary</Button>
                    <Button classItem={"btn primary p-accent"}>Primary</Button>
                    <Button classItem={"btn secondary"}>Secondary</Button>
                    <Button classItem={"btn secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn warn"}>Warn</Button>
                    <Button classItem={"btn alert"}>Alert</Button>
                    <Button classItem={"btn"}>default</Button>
                    {/* <Button classItem={"btn disabled"}>Disabled</Button> */}
                </div>

                <div className="card overflow" style={{ height: "21%" }}>
                    <h1>Lorem Ipsum Dolor Sit Amet</h1>
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h3>Lorem Ipsum Dolor Sit Amet</h3>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet vehicula risus. Praesent tempus consequat nisi in pulvinar. Phasellus velit orci, dictum ut scelerisque ac, condimentum sit amet ligula. Proin convallis interdum diam eleifend dictum. Nullam placerat suscipit gravida. Ut arcu turpis, venenatis a ex nec, elementum condimentum turpis. Nunc fermentum, nulla ut vestibulum blandit, massa augue congue odio, quis tincidunt diam enim ac ante. Pellentesque vestibulum hendrerit augue finibus iaculis. Quisque aliquam in eros nec molestie. Cras ullamcorper vehicula rutrum. Donec vel interdum ante. Nullam ac egestas enim. Maecenas volutpat volutpat vulputate.</p>
                    <p><strong>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet vehicula risus. Praesent tempus consequat nisi in pulvinar. Phasellus velit orci, dictum ut scelerisque ac, condimentum sit amet ligula. Proin convallis interdum diam eleifend dictum. Nullam placerat suscipit gravida. Ut arcu turpis, venenatis a ex nec, elementum condimentum turpis. Nunc fermentum, nulla ut vestibulum blandit, massa augue congue odio, quis tincidunt diam enim ac ante. Pellentesque vestibulum hendrerit augue finibus iaculis. Quisque aliquam in eros nec molestie. Cras ullamcorper vehicula rutrum. Donec vel interdum ante. Nullam ac egestas enim. Maecenas volutpat volutpat vulputate.</strong></p>
                    <p><em>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet vehicula risus. Praesent tempus consequat nisi in pulvinar. Phasellus velit orci, dictum ut scelerisque ac, condimentum sit amet ligula. Proin convallis interdum diam eleifend dictum. Nullam placerat suscipit gravida. Ut arcu turpis, venenatis a ex nec, elementum condimentum turpis. Nunc fermentum, nulla ut vestibulum blandit, massa augue congue odio, quis tincidunt diam enim ac ante. Pellentesque vestibulum hendrerit augue finibus iaculis. Quisque aliquam in eros nec molestie. Cras ullamcorper vehicula rutrum. Donec vel interdum ante. Nullam ac egestas enim. Maecenas volutpat volutpat vulputate.</em></p>
                    <p><code>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet vehicula risus. Praesent tempus consequat nisi in pulvinar. Phasellus velit orci, dictum ut scelerisque ac, condimentum sit amet ligula. Proin convallis interdum diam eleifend dictum. Nullam placerat suscipit gravida. Ut arcu turpis, venenatis a ex nec, elementum condimentum turpis. Nunc fermentum, nulla ut vestibulum blandit, massa augue congue odio, quis tincidunt diam enim ac ante. Pellentesque vestibulum hendrerit augue finibus iaculis. Quisque aliquam in eros nec molestie. Cras ullamcorper vehicula rutrum. Donec vel interdum ante. Nullam ac egestas enim. Maecenas volutpat volutpat vulputate.</code></p>
                    <p><abbr title="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet vehicula risus. Praesent tempus consequat nisi in pulvinar. Phasellus velit orci, dictum ut scelerisque ac, condimentum sit amet ligula. Proin convallis interdum diam eleifend dictum. Nullam placerat suscipit gravida. Ut arcu turpis, venenatis a ex nec, elementum condimentum turpis. Nunc fermentum, nulla ut vestibulum blandit, massa augue congue odio, quis tincidunt diam enim ac ante. Pellentesque vestibulum hendrerit augue finibus iaculis. Quisque aliquam in eros nec molestie. Cras ullamcorper vehicula rutrum. Donec vel interdum ante. Nullam ac egestas enim. Maecenas volutpat volutpat vulputate.">hover me</abbr></p>
                </div>

                <div className="card">
                    <h1>Card A</h1>
                    <div className="card c-item">Card Inner</div>
                    <Button classItem={"btn primary"}>Button</Button>
                </div>
                <div className="card c-item">
                    <h1>Card B</h1>
                    <Button classItem={"btn primary"}>Button</Button>
                    <Button classItem={"btn primary"}>Button</Button>
                </div>
                <div className="card">
                    <h1>Card C</h1>
                    <Button classItem={"btn primary"}>Button</Button>
                </div>

            </div>
            <StatusBar/>
        </>
    );
}