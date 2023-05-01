using System;
using Microsoft.AspNetCore.SignalR;


namespace MinecraftStudio
{
    public class LogHub : Hub
    {
        public void Log(string message)
        {
            Console.WriteLine(message);
        }
    }
}
