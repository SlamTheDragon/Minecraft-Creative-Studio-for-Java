interface ButtonInterface {
    classItem?: string               // define class extension in index.scss
    children?: React.ReactNode
    disabled?: boolean
    tabIndex?: number
    onClick?: () => any
}

export default function Button(props: ButtonInterface) {
    return (
        <button disabled={props.disabled}
            tabIndex={props.tabIndex}
            className={"btn " +  props.classItem}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}