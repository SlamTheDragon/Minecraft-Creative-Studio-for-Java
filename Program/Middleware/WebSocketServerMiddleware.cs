using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using System.Linq;

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
                Console.WriteLine("[WEBSOCKET] Websocket Connected");

                var ConnectionID = _manager.AddSocket(webSocket);
                await SendConnectionIDAsync(webSocket, ConnectionID);

                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        System.Console.Write("[WEBSOCKET] Recieved ");
                        System.Console.Write($"Message: {Encoding.UTF8.GetString(buffer, 0, result.Count)}");

                        await RouteJSONMessageAsync(Encoding.UTF8.GetString(buffer, 0, result.Count));
                        return;
                    }
                    else if (result.MessageType == WebSocketMessageType.Close)
                    {
                        var id = _manager.GetAllSockets().FirstOrDefault(s => s.Value == webSocket).Key;

                        System.Console.WriteLine("[WEBSOCKET] Connection Closed");

                        _manager.GetAllSockets().TryRemove(id, out WebSocket sock);
                        await sock!.CloseAsync(result.CloseStatus!.Value, result.CloseStatusDescription, CancellationToken.None);

                        return;
                    }
                });
            }
            else
            {
                // System.Console.WriteLine("[WEBSOCKET] Hello from the 2rd request delagate");
                // await _next(context);
            }
        }

        private async Task SendConnectionIDAsync(WebSocket socket, string ConnectionID)
        {
            var buffer = Encoding.UTF8.GetBytes("[CLIENT] Connection ID: " + ConnectionID);
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

        public void WriteRequestParam(HttpContext context)
        {
            System.Console.WriteLine("[TRACE] Request Method: " + context.Request.Method);
            System.Console.WriteLine("[TRACE] Request Protocol: " + context.Request.Protocol);

            if (context.Request.Headers != null)
            {
                foreach (var h in context.Request.Headers)
                {
                    System.Console.WriteLine("[TRACE] " + h.Key + " : " + h.Value);
                }
            }
        }

        public async Task RouteJSONMessageAsync(string message)
        {
            try
            {
                var routeObj = JsonSerializer.Deserialize<JsonElement>(message);

                if (routeObj.TryGetProperty("To", out var toProperty) && toProperty.ValueKind == JsonValueKind.String && Guid.TryParse(toProperty.GetString(), out Guid guidOutput))
                {
                    System.Console.WriteLine(" Type: Targeted");
                    var sock = _manager.GetAllSockets().FirstOrDefault(s => s.Key == toProperty.GetString());

                    if (sock.Value != null && sock.Value.State == WebSocketState.Open)
                    {
                        await sock.Value.SendAsync(Encoding.UTF8.GetBytes(routeObj.GetProperty("Message").GetString()!),
                            WebSocketMessageType.Text, true, CancellationToken.None);
                    }
                    else
                    {
                        System.Console.WriteLine("[WEBSOCKET] Invalid Recipient" + routeObj);
                    }
                }
                else
                {
                    System.Console.WriteLine(" Type: Broadcast");
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
            catch (Exception ex)
            {
                System.Console.WriteLine("[WEBSOCKET] Error handling message: " + ex.Message);
            }
        }
    }
}