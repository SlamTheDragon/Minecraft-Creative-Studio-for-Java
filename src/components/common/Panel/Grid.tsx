import React from 'react';

interface GridProps {
    children?: React.ReactNode;
}

const Grid = ({ children }: GridProps) => {
    return <div className="grid">{children}</div>;
};

export default Grid;