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


export default function Button({ idItem, onclick, children, classItem, disabled, tabIndex, style, onKeyDown }: ButtonInterface) {
    return (
        <button disabled={disabled}
            id={idItem}
            tabIndex={tabIndex}
            className={classItem}
            onClick={onclick}
            onKeyDown={onKeyDown}
            // style={style} <- ? wha

        // NOTE Use useNavigate from `react-router-dom` if you want to use the button as a navigator.
        >
            {children}
        </button>
    );
}