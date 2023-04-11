import React, { useState, useRef, DragEvent } from 'react';

interface Size {
    width: number;
    height: number;
}

interface Position {
    x: number;
    y: number;
}

interface DraggableBoxProps {
    children?: React.ReactNode;
}

const Panel = ({ children }: DraggableBoxProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [size, setSize] = useState<Size>({ width: 100, height: 100 });
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', ''); // required for Firefox
        setIsDragging(true);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: event.clientX - size.width / 2,
            y: event.clientY - size.height / 2,
        });
    };

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div
            className={`draggable-box${isDragging ? ' dragging' : ''}`}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            ref={ref}
            style={{
                width: `${size.width}px`,
                height: `${size.height}px`,
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
        >
            {children}
            <div className="resize-handle"></div>
        </div>
    );
};

export default Panel;