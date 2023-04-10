import React from 'react';
import { Link } from "react-router-dom";


interface ButtonInterface {
    classItem: string;
    href?: string;
    onclick?: () => any;
    children?: React.ReactNode;
}

export default function Button({ href, classItem, children, onclick }: ButtonInterface): JSX.Element {
    return (
        (href) ?
            (<Link className={classItem} to={href}> {children} </Link>) :
            (<button className={classItem} onClick={onclick}> {children} </button>)
    );
}