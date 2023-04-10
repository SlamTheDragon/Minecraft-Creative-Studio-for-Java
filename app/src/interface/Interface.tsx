import { useState } from "react";
import Button from "../components/common/Button/Button";
import ThemeSwitcher from "../components/custom/ThemeSwitcher/ThemeSwitcher";
import Modal from "../components/common/Modal/Modal";
import { ReactComponent as Settings } from '@material-design-icons/svg/filled/settings.svg';

export default function Interface() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.classList.add('disable-events');

        const outsideElements = document.querySelectorAll('button');
        outsideElements.forEach((element) => {
            element.setAttribute('tabindex', '-1');
        });

    };
    
    const closeModal = () => {
        setIsModalOpen(false);

        const outsideElements = document.querySelectorAll('button');
        outsideElements.forEach((element) => {
            element.removeAttribute('tabindex');
        });
    };

    const handleMouseEnter = () => {
        document.body.classList.remove('disable-events');
    };

    return(
        <>  
            <Modal isOpen={isModalOpen} onClose={closeModal} onMouseEnter={handleMouseEnter}>
                <h2>Modal Title</h2>
                <p>Modal content goes here.</p>
            </Modal>
            
            <div className="viewport">

                <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", padding: "50px", height: "50%" }}>
                    <h1>
                        Theming
                    </h1>
                    <p>
                        Theming process for the interface module of the application 
                    </p>
                    <hr style={{width:"100%"}}/>
                    <span>function button(s):</span>
                    <ThemeSwitcher />
                    <Button classItem={'btn ctrl-btn'} onclick={openModal} > <Settings/> </Button>
                </div>

                <div className="card" style={{display: "flex", flexDirection: "row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Button classItem={"btn primary"}>Primary</Button>
                    <Button classItem={"btn primary p-accent"}>Primary</Button>
                    <Button classItem={"btn secondary"}>Secondary</Button>
                    <Button classItem={"btn secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn warn"}>Warn</Button>
                    <Button classItem={"btn alert"}>Alert</Button>
                    <Button classItem={"btn"}>default</Button>
                    {/* <Button classItem={"btn disabled"}>Disabled</Button> */}
                </div>
                <div className="" style={{display: "flex", flexDirection: "row", justifyContent:"flex-start", alignItems:"center"}}>
                    <Button classItem={"btn primary"}>Primary</Button>
                    <Button classItem={"btn primary p-accent"}>Primary</Button>
                    <Button classItem={"btn secondary"}>Secondary</Button>
                    <Button classItem={"btn secondary s-accent"}>Secondary</Button>
                    <Button classItem={"btn warn"}>Warn</Button>
                    <Button classItem={"btn alert"}>Alert</Button>
                    <Button classItem={"btn"}>default</Button>
                    {/* <Button classItem={"btn disabled"}>Disabled</Button> */}
                </div>

                <div className="card overflow" style={{height: "10%"}}>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    a <br/>
                    <Button classItem={"btn"}>a</Button>
                </div>

            </div>
        </>
    );
}