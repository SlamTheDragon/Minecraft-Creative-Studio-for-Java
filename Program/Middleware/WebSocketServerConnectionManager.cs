// using System;
// using System.Collections.Concurrent;
// using System.Net.WebSockets;

// namespace WebSocketServer.Middleware
// {
//     public class WebSocketServerConnectionManager
//     {
//         private ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

//         public ConcurrentDictionary<string, WebSocket> GetAllSockets()
//         {
//             return _sockets;
//         }

//         public string AddSocket(WebSocket socket)
//         {
//             string ConnectionID = Guid.NewGuid().ToString();
//             _sockets.TryAdd(ConnectionID, socket);
//             System.Console.WriteLine("[WEBSOCKET] Websocket ID: " + ConnectionID);

//             return ConnectionID;
//         }
//     }
// }