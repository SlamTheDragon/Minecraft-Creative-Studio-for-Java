import { useEffect, useState } from "react";
import { ReactComponent as Settings } from '@material-design-icons/svg/filled/settings.svg';
import { ReactComponent as Home } from '@material-design-icons/svg/filled/home.svg';
import { ReactComponent as Info } from '@material-design-icons/svg/outlined/info.svg';
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import ThemeSwitcher from "../custom/ThemeSwitcher/ThemeSwitcher";
import Modal from "../common/Modal/Modal";
import { ConnectionManager } from "../program/ConnectionManager";
import { ConnectionState } from "../program/ConnectionState";
// import { Events } from "../program/Events";
import { socket } from "../../socket";


export default function ThemePlayground() {

    const history = useNavigate();

    let handleClick = () => {
        history('/');
    };

    const [showModal, setShowModal] = useState(false);
    // Open Modal
    function openModal() {
        setShowModal(true);
        document.body.classList.add('disable-events');
        document.addEventListener('keydown', handleEscapeKeyPress);
        // you could also add other selectors e.g.; ...rAll('button, div, a, ...');
        const outsideElements = document.querySelectorAll('button, div, a, input, textarea, select');
        outsideElements.forEach((element) => {
            element.setAttribute('tabindex', '-1');
        });
    };
    function handleMouseEnter() {
        document.body.classList.remove('disable-events');
    };
    // Keybind Listner
    function handleEscapeKeyPress(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            closeModal();
        }
    };
    // Closes Modal
    function closeModal() {
        setShowModal(false);
        document.removeEventListener('keydown', handleEscapeKeyPress);
        const outsideElements = document.querySelectorAll('button, div, a, input, textarea, select');
        outsideElements.forEach((element) => {
            element.removeAttribute('tabindex');
        });
    };

    /***************************************************************/

    interface FooEvent {
        e: Array<[]>
    }

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState<FooEvent[]>([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(e: FooEvent) {
            setFooEvents(previous => [...previous, e]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);


    return (
        <>
            <Modal isOpen={showModal} onClose={closeModal} onMouseEnter={handleMouseEnter} modalTitle={"Modal Title"}>
                <div>Modal content goes here.</div>
            </Modal>

            <div className="viewport" style={{ overflowY: "scroll" }}>

                <ConnectionState isConnected={isConnected} />
                {/* <Events events={fooEvents} /> */}
                <ConnectionManager />


                <div className="" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", padding: "50px", height: "40%" }}>
                    <h1>
                        Minecraft Studio Theme v1.1
                    </h1>
                    <h3>
                        Aiming for a shell/native-like experience
                    </h3>
                    <hr style={{ width: "100%" }} />
                    <span>function button(s):</span>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <ThemeSwitcher />
                        <Button classItem={'btn-b'} onclick={openModal} ><Settings /></Button>
                        <Button classItem={"btn-b"} onclick={handleClick} ><Home /></Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Button classItem={"btn-b"}><Info /></Button>
                        <Button classItem={"btn-b primary"}><Info /></Button>
                        <Button classItem={"btn-b primary p-accent"}><Info /></Button>
                        <Button classItem={"btn-b secondary"}><Info /></Button>
                        <Button classItem={"btn-b secondary s-accent"}><Info /></Button>
                        <Button classItem={"btn-b warn"}><Info /></Button>
                        <Button classItem={"btn-b alert"}><Info /></Button>
                        <Button classItem={"btn-b disabled"}><Info /></Button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <span>
                            <s>
                                click <strong>home</strong> to go back to the main view
                            </s>
                            <br />
                            this has been removed
                        </span>
                    </div>
                </div>

                <div className="card c-container" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
                    <h1>Inputs</h1>

                    <input type="button" value="Button Label" />

                    <span style={{ display: "flex", flexDirection: "row" }}>
                        <input type="checkbox" />
                        <Button classItem={"btn-b"}><Info /></Button>
                        <input type="radio" />
                    </span>
                    <input type="range" />
                    <input type="file" />
                    <input type="number" />
                    <input type="text" />
                    <input type="reset" />
                    <textarea className="ta-none" name="paragraph_text" cols={100} rows={10}></textarea>
                    <textarea className="ta-v" name="paragraph_text" cols={100} rows={10}></textarea>
                    <textarea name="paragraph_text" cols={100} rows={10}></textarea>
                    <select>
                        <option>Choose Option</option>
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                </div>

                <div className="card" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button classItem={"btn primary"}>Primary</Button>
                    <Button classItem={"btn primary p-accent"}>Primary</Button>
                    <Button classItem={"btn secondary"}>Secondary</Button>
                    <Button classItem={"btn secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn warn"}>Warn</Button>
                    <Button classItem={"btn alert"}>Alert</Button>
                    <Button classItem={"btn"}>default</Button>
                    <Button classItem={"btn-b"}><Info /></Button>
                    <Button classItem={"btn-b primary"}><Info /></Button>
                    <Button classItem={"btn-b primary p-accent"}><Info /></Button>
                    <Button classItem={"btn-b secondary"}><Info /></Button>
                    <Button classItem={"btn-b secondary s-accent"}><Info /></Button>
                    <Button classItem={"btn-b warn"}><Info /></Button>
                    <Button classItem={"btn-b alert"}><Info /></Button>
                    <Button classItem={"btn-b disabled"}><Info /></Button>
                </div>
                <div className="" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                    <Button classItem={"btn-a primary"}>Primary</Button>
                    <Button classItem={"btn-a primary p-accent"}>Primary</Button>
                    <Button classItem={"btn-a secondary"}>Secondary</Button>
                    <Button classItem={"btn-a secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn-a warn"}>Warn</Button>
                    <Button classItem={"btn-a alert"}>Alert</Button>
                    <Button classItem={"btn-a "}>default</Button>
                    <Button classItem={"btn-a disabled"}>Disabled</Button>
                </div>

                <div className="card overflow" style={{ height: "35%" }}>
                    <h1>Lorem Ipsum Dolor Sit Amet</h1>
                    <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    <h3>Lorem Ipsum Dolor Sit Amet</h3>
                    <h4>Lorem Ipsum Dolor Sit Amet</h4>
                    <h5>Lorem Ipsum Dolor Sit Amet</h5>
                    <h6>Lorem Ipsum Dolor Sit Amet</h6>

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
        </>
    );
}