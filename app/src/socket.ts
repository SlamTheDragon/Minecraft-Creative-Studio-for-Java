import { io as ServerListener } from 'socket.io-client';


// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:14838';

export const socket = ServerListener(URL!, {
    autoConnect: false
});