using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Linq;
using MinecraftStudio.Internal.Logging;

namespace WebSocketServer.Middleware
{
    public class WebSocketServerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly WebSocketServerConnectionManager _manager = new WebSocketServerConnectionManager();

        public WebSocketServerMiddleware(RequestDelegate next, WebSocketServerConnectionManager manager)
        {
            _next = next;
            _manager = manager;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // WriteRequestParam(context);

            if (context.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                InternalLog.Info("Websocket Connected", Origin.SERVER);

                WriteRequestParam(context);
                var ConnectionID = _manager.AddSocket(webSocket);
                await SendConnectionIDAsync(webSocket, ConnectionID);

                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        InternalLog.Info("Recieved " + $"Message: {Encoding.UTF8.GetString(buffer, 0, result.Count)}", Origin.SERVER);

                        await RouteJSONMessageAsync(Encoding.UTF8.GetString(buffer, 0, result.Count));
                        return;
                    }
                    else if (result.MessageType == WebSocketMessageType.Close)
                    {
                        var id = _manager.GetAllSockets().FirstOrDefault(s => s.Value == webSocket).Key;

                        InternalLog.Info("Connection Closed", Origin.SERVER);

                        _manager.GetAllSockets().TryRemove(id, out WebSocket sock);
                        await sock!.CloseAsync(result.CloseStatus!.Value, result.CloseStatusDescription, CancellationToken.None);

                        return;
                    }
                });
            }
            else
            {
                // System.Console.WriteLine("[WEBSOCKET] Hello from the 2rd request delagate");
                await _next(context);
            }
        }

        private async Task SendConnectionIDAsync(WebSocket socket, string ConnectionID)
        {
            var buffer = Encoding.UTF8.GetBytes("Connection ID: " + ConnectionID);
            InternalLog.Info("Connection ID: " + ConnectionID, Origin.SERVER);

            await socket.SendAsync(buffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }

        private async Task ReceiveMessage(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer),
                    cancellationToken: CancellationToken.None);

                handleMessage(result, buffer);
            }
        }

        // DEBUG
        public void WriteRequestParam(HttpContext context)
        {
            InternalLog.Debug("[TRACE] Request Method: " + context.Request.Method, Origin.SERVER);
            InternalLog.Debug("[TRACE] Request Protocol: " + context.Request.Protocol, Origin.SERVER);

            if (context.Request.Headers != null)
            {
                foreach (var h in context.Request.Headers)
                {
                    InternalLog.Debug("[TRACE] " + h.Key + " : " + h.Value, Origin.SERVER);
                }
            }
        }


        public async Task RouteJSONMessageAsync(string message)
        {
            try
            {
                // Deserialize the incoming message into a JsonElement object
                var routeObj = JsonSerializer.Deserialize<JsonElement>(message);

                // Check if the message has a "To" property with a valid GUID value
                if (routeObj.TryGetProperty("To", out var toProperty) && toProperty.ValueKind == JsonValueKind.String && Guid.TryParse(toProperty.GetString(), out Guid guidOutput))
                {
                    // Find the WebSocket connection corresponding to the specified GUID

                    InternalLog.Info("Message Type: Targeted", Origin.SERVER);
                    var sock = _manager.GetAllSockets().FirstOrDefault(s => s.Key == toProperty.GetString());

                    if (sock.Value != null && sock.Value.State == WebSocketState.Open)
                    {
                        // Send the message to the specified WebSocket connection
                        await sock.Value.SendAsync(Encoding.UTF8.GetBytes(routeObj.GetProperty("Message").GetString()!),
                            WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else
                    {
                        InternalLog.Warn("Invalid Recipient" + routeObj, Origin.SERVER);
                    }
                }
                else
                {
                    // Broadcast the message to all connected WebSocket clients
                    InternalLog.Info("Message Type: Broadcast", Origin.SERVER);
                    var messageProperty = routeObj.GetProperty("Message");

                    foreach (var sock in _manager.GetAllSockets())
                    {
                        if (sock.Value.State == WebSocketState.Open)
                        {
                            await sock.Value.SendAsync(Encoding.UTF8.GetBytes(messageProperty.GetString()!),
                                WebSocketMessageType.Text, true, CancellationToken.None);
                        }
                    }
                }
            }
            catch (Exception e)
            {
                InternalLog.Info("Error handling message: " + e.Message, Origin.SERVER);
            }
        }
    }
}