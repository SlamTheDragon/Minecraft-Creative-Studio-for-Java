import React from 'react';


interface ButtonInterface {
    classItem: string;
    href?: string;
    onclick?: () => any;
    children?: React.ReactNode;
}

export default function Button({ classItem, children, onclick }: ButtonInterface): JSX.Element {
  
    return (
            (<button className={classItem} onClick={onclick}> {children} </button>)
    );
}