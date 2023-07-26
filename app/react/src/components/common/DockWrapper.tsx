import React from "react";

/**
 * @todo define and list all groups inside the main component array
 * 
 * a higher hierarchy to oversee the child arrays are needed to determine if they are mounted or not
 * (which either means that if the component should be displayed or not)
*/

interface PanelProps {
    children?: React.ReactNode
}

export default function DockWrapper(props: PanelProps) {
    const childArray = React.Children.toArray(props.children);

    return (
        <div>
            {childArray}
        </div>
    );
}