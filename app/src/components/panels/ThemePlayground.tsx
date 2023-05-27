import { useState } from "react";
import { ReactComponent as Settings } from '@material-design-icons/svg/filled/settings.svg';
import { ReactComponent as Home } from '@material-design-icons/svg/filled/home.svg';
import { ReactComponent as Info } from '@material-design-icons/svg/outlined/info.svg';
import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import ThemeSwitcher from "../custom/ThemeSwitcher/ThemeSwitcher";
import Modal from "../common/Modal/Modal";


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


    /*******************************************/ // Websocket Client
    // let connectionURL = document.getElementById("connectionURL");
    // let connectButton = document.getElementById("connectButton");
    // let stateLabel = document.getElementById("stateLabel");
    // let sendMessage = document.getElementById("sendMessage");
    // let sendButton = document.getElementById("sendButton");
    // let commsLog = document.getElementById("commsLog");
    // let closeButton = document.getElementById("closeButton");
    // let recipients = document.getElementById("recipients");
    // let ConnID = document.getElementById("connIDLabel");

    // connectionURL.value = "ws://localhost:8001";

    // connectButton.onclick = () => {
    //     stateLabel.innerHTML = "Attempting to Connect...";
    //     socket = new WebSocket(connectionURL.value);
    //     socket.onopen = (event) => {
    //         updateState();
    //         commsLog.innerHTML += '<tr>' +
    //             '<td colspan="3" style="background-color: #98ffb9;"> Connection opened.</td>' +
    //             '</tr>';
    //     };

    //     socket.onclose = (event) => {
    //         updateState();
    //         commsLog.innerHTML += '<tr>' +
    //             '<td colspan="3" style="background-color: #ff9090;"> Connection Closed. Code: ' + htmlEscape(event.code) +
    //             ' Reason: ' + htmlEscape(event.reason) + '</td>' +
    //             '</tr>';
    //     };

    //     socket.onerror = updateState();
    //     socket.onmessage = (event) => {
    //         commsLog.innerHTML += '<tr>' +
    //             '<td>Server</td>' +
    //             '<td>Client</td>' +
    //             '<td>' + htmlEscape(event.data) + '</td></tr>';
    //         isConnID(event.data);
    //     };
    // };

    // closeButton.onclick = () => {
    //     closeSocketInfo()
    //     socket.close(1000, "Closing from Client");
    // }

    // sendButton.onclick = () => {
    //     closeSocketInfo()
    //     var data = constructJSON()
    //     socket.send(data);
    //     commsLog.innerHTML += '<tr>' +
    //         '<td>Server</td>' +
    //         '<td>Client</td>' +
    //         '<td>' + htmlEscape(data) + '</td></tr>';
    // }

    // function closeSocketInfo() {
    //     if (!socket || socket.readyState !== WebSocket.OPEN) {
    //         alert("Socket Not Connected");
    //     } else {
    //         return console.log("returned");
    //     }
    // }

    // function isConnID(str) {
    //     if (str.substring(0, 23) == "[CLIENT] Connection ID:") {
    //         ConnID.innerHTML = "ConnID: " + str.substring(24, 61);
    //     }
    // }

    // function constructJSON() {
    //     return JSON.stringify({
    //         "From": ConnID.innerHTML.substring(24, ConnID.innerHTML.length),
    //         "To": recipients.value,
    //         "Message": sendMessage.value
    //     });
    // }

    // function htmlEscape(str) {
    //     return str.toString()
    //         .replace(/&/g, '&amp;')
    //         .replace(/"/g, '&quot;')
    //         .replace(/'/g, '&#39;')
    //         .replace(/</g, '&lt;')
    //         .replace(/>/g, '&gt;')
    // };

    // function updateState() {
    //     function disable() {
    //         sendMessage.disabled = true;
    //         sendButton.disabled = true;
    //         closeButton.disabled = true;
    //         recipients.disabled = true;
    //     };
    //     function enable() {
    //         sendMessage.disabled = false;
    //         sendButton.disabled = false;
    //         closeButton.disabled = false;
    //         recipients.disabled = false;
    //     };

    //     connectionURL.disabled = true;
    //     connectButton.disabled = true;

    //     if (!socket) {
    //         disable();
    //     } else {
    //         switch (socket.readyState) {
    //             case WebSocket.CLOSED:
    //                 stateLabel.innerHTML = "Closed";
    //                 ConnID.innerHTML = "ConnID: n/a";
    //                 disable();
    //                 connectionURL.disable = false;
    //                 connectButton.disable = false;
    //                 break;

    //             case WebSocket.CLOSING:
    //                 stateLabel.innerHTML = "Closing...";
    //                 disable();
    //                 break;

    //             case WebSocket.OPEN:
    //                 stateLabel.innerHTML = "Open";
    //                 enable();
    //                 break;

    //             default:
    //                 stateLabel.innerHTML = "Unknown WebSocket State: " + htmlEscape(socket.readyState);
    //                 disable()
    //                 break;
    //         }
    //     }
    // };


    return (
        <>
            <Modal isOpen={showModal} onClose={closeModal} onMouseEnter={handleMouseEnter} modalTitle={"Modal Title"}>
                <div>Modal content goes here.</div>
            </Modal>

            <div className="viewport" style={{ overflowY: "scroll" }}>
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

                {/*
                 <div className="card c-container">
                    <h1>WebSocket | ReactJS Client Middleware Testing</h1>
                    <p id="stateLabel">Ready To Connect</p>
                    <p id="connIDLabel">Connection ID: n/a</p>

                    <div>
                        <label htmlFor="connectionURL">WebSocket Server Url</label>
                        <input id="connectionURL" type="text" placeholder="ws://"/>
                        <Button classItem={"btn"} idItem="connectButton">Connect</Button>
                        <Button classItem={"btn"} idItem="closeButton" disabled={true}>Close Socket</Button>
                    </div>

                    <div>
                        <label htmlFor="sendMessage">Message:</label>
                        <input id="sendMessage" disabled type="text" />
                        <Button classItem={"btn"} idItem="sendButton" disabled={true}>Send</Button>
                    </div>

                    <div>
                        <label htmlFor="recipients">Recipient ID:</label>
                        <input id="recipients" disabled type="text"/>
                    </div>

                    <h1>Communication Log</h1>
                    <table style={{ width: "800px" }}>
                        <thead>
                            <tr>
                                <td style={{ width: "100px" }}>From</td>
                                <td style={{ width: "100px" }}>To</td>
                                <td>Data</td>
                            </tr>
                        </thead>

                        <tbody id="commsLog">

                        </tbody>

                    </table>
                </div> 
                */}

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