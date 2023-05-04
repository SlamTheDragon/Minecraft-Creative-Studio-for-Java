interface Connection {
    isConnected: boolean
}

export function ConnectionState({ isConnected }: Connection) {
    return <p>State: { '' + isConnected } </p>;
}