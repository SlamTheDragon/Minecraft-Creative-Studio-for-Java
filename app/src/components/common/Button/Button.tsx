interface ButtonInterface {
    classItem: string               // btn | btn-a | btn-b | primary | secondary | warn | alert | p-accent | s-accent | disabled
    idItem?: string
    children?: React.ReactNode
    disabled?: boolean
    tabIndex?: number
    style?: string
    onclick?: () => any
    onKeyDown?: (event: any) => any
}


export default function Button(props: ButtonInterface) {
    return (
        <button disabled={props.disabled}
            id={props.idItem}
            tabIndex={props.tabIndex}
            className={props.classItem}
            onClick={props.onclick}
            onKeyDown={props.onKeyDown}
            // style={style} <- ? wha

        // NOTE Use useNavigate from `react-router-dom` if you want to use the button as a navigator.
        >
            {props.children}
        </button>
    );
}