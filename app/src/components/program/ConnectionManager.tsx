import { socket } from '../../socket';

export function ConnectionManager() {
    function connect() {
        socket.connect();
        console.info("Attempting to connect...");
    }
    
    function disconnect() {
        socket.disconnect();
        console.info("Disconnected");
    }

    return (
        <>
            <button onClick={connect}>Connect</button>
            <button onClick={disconnect}>Disconnect</button>
        </>
    );
}

