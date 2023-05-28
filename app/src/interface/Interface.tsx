import { useState, useEffect, MouseEvent } from 'react';
import ThemePlayground from '../components/panels/ThemePlayground';
import '../index.scss'
import './Interface.scss'


export default function Interface() {
    const [draggingState, setDragging] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ X: 0, Y: 0 });
    const [offset, setOffset] = useState({ X: 0, Y: 0 });
    const [DimensionX, setDimensionX] = useState(window.innerWidth)
    const [DimensionY, setDimensionY] = useState(window.innerHeight)
    const [dTop, setTop] = useState(100);
    const [dRight, setRight] = useState(300);
    const [dBottom, setBottom] = useState(200);
    const [dLeft, setLeft] = useState(100);

    useEffect(() => {
        function handleMouseUp() {
            setDragging(false);
        }

        function foo() {
            const theFalsery = -1
            if (
                Math.sign(dTop + anchorPoint.Y) === theFalsery ||
                Math.sign(dRight - anchorPoint.X) === theFalsery ||
                Math.sign(dBottom - anchorPoint.Y) === theFalsery ||
                Math.sign(dLeft + anchorPoint.X) === theFalsery
            ) {
                reset()
            }
        }

        function reset() {
            setAnchorPoint({ X: 0, Y: 0 });
            setOffset({ X: 0, Y: 0 });
            console.log("reset");
        }

        function handleWindowMouseMove(e: { clientX: number; clientY: number; }) {
            if (!draggingState) {
                return;
            }

            const newAnchorX = e.clientX - offset.X;
            const newAnchorY = e.clientY - offset.Y;
            setAnchorPoint({ X: newAnchorX, Y: newAnchorY });
        }

        foo()
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [draggingState, offset]);


    function handleMouseDown(e: MouseEvent, side: string) {

        if (side === 'top') {
            const handleMouseMove = (e: { clientY: any; }) => {
                const value = e.clientY - anchorPoint.Y;
                setTop(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'left') {
            const handleMouseMove = (e: { clientX: any; }) => {
                const value = e.clientX - anchorPoint.X;
                setLeft(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'right') {
            const handleMouseMove = (e: { clientX: any; }) => {
                const value = anchorPoint.X - (e.clientX - DimensionX);
                setRight(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'bottom') {
            const handleMouseMove = (e: { clientY: any; }) => {
                const value = anchorPoint.Y - (e.clientY - DimensionY);
                setBottom(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'top-left') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = e.clientY - anchorPoint.Y;
                const valueY = e.clientX - anchorPoint.X;
                setTop(valueX);
                setLeft(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'top-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - (e.clientX - DimensionX);
                const valueY = e.clientY - anchorPoint.Y;
                setRight(valueX);
                setTop(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'bottom-left') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = e.clientX - anchorPoint.X;
                const valueY = anchorPoint.Y - (e.clientY - DimensionY);
                setLeft(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'bottom-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - (e.clientX - DimensionX)
                const valueY = anchorPoint.Y - (e.clientY - DimensionY)
                setRight(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'default') {
            setDragging(true);

            const offsetX = e.clientX - anchorPoint.X;
            const offsetY = e.clientY - anchorPoint.Y;
            setOffset({ X: offsetX, Y: offsetY });
        }
    }

    function calculateInset() {
        return {
            top: dTop + anchorPoint.Y,
            right: dRight - anchorPoint.X,
            bottom: dBottom - anchorPoint.Y,
            left: dLeft + anchorPoint.X,
        };
    }

    function calculateElementHeight() {
        const panelHeight = document.getElementById("f")?.offsetHeight

        return {
            height: panelHeight! - 17
        };
    }

    return (

        <div className='interface'>
            <div className="i-floatier">
                <div
                    className="f"
                    id='f'

                    style={{
                        top: `${calculateInset().top}px`,
                        right: `${calculateInset().right}px`,
                        bottom: `${calculateInset().bottom}px`,
                        left: `${calculateInset().left}px`
                    }}
                >
                    <div className="draggable" onMouseDown={(e) => handleMouseDown(e, 'default')}></div>

                    <div className="resizable-top">
                        <div className="handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
                        <div className="handle top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
                        <div className="handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
                    </div>

                    <div className="resizable-mid">
                        <div className="handle left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

                        {/* Container Content */}
                        <div
                            className="container"
                            style={{
                                height: `${calculateElementHeight().height}px`
                            }}
                        >
                            <ThemePlayground />
                        </div>

                        <div className="handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
                    </div>

                    <div className="resizable-bottom">
                        <div className="handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
                        <div className="handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
                        <div className="handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
                    </div>
                </div>
            </div>

            <div className="i-content">
                <div className="d">
                    <div className='card c-container'>
                        <h1>Welcome to Minecraft Creative Studio</h1>


                        <div className='card'>
                            <h2>Minecraft Creative Studio for Java</h2>
                            <span>
                                Minecraft Creative Studio (MCS/MCSJava) is a free, open-source 3D world-editing program designed exclusively for Minecraft Java Edition. It includes a range of features to help Minecraft builders, designers, animators, and others. This Minecraft Creative Editor takes inspiration from <a href="http://learn.microsoft.com/en-us/minecraft/creator/documents/editorinstallation">Minecraft Bedrock's Editor </a> and aims to provide expandable tools that offer more creative freedom and opportunities to creators, speeding up their workflows.
                            </span>
                            <span>
                                Minecraft Creative Studio aims to include the best features and tools developed over the years, such as <a href="http://www.worldpainter.net/">World Painter</a> and <a href="http://www.mcedit.net/">MCEdit</a>, while also offering powerful editing tools that cater to your editing and planning needs. Additionally, Minecraft Creative Studio allows you to expand the application beyond its capabilities through additional plugins.
                            </span>

                            <br />

                            <h2>
                                This Desktop Application is Still in its Predevelopment Stage
                            </h2>

                            This is a passion project made by <a href="http://github.com/SlamTheDragon">SlamTheDragon</a>

                            - This project is not being actively developed and is being updated from time to time. Feel free to check out this repository's <a href="http://github.com/SlamTheDragon/Minecraft-Creative-Studio-for-Java/discussions">discussions</a> tab for more information about the project.

                            The project author does not have enough skillset to properly develop this desktop application smoothly as what he have envisioned before <a href="http://learn.microsoft.com/en-us/minecraft/creator/documents/editorinstallation">Minecraft Preview Editor</a> came out. If you wish to contribute to this project feel free to open any issues or pull requests or Join us with the discussion in this repository's <a href="http://github.com/SlamTheDragon/Minecraft-Creative-Studio-for-Java/discussions">discussions</a> tab.

                            <br />

                            <h2>
                                License
                            </h2>
                            Minecraft Creative Studio's source-code is licensed under <a href="http://github.com/SlamTheDragon/Minecraft-Creative-Studio-for-Java/blob/main/LICENSE">GPL-v3.0</a>. Every modification of MCS's source-code must be and always be made under the terms of this repository's license.

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
}