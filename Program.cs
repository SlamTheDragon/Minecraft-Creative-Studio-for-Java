using ElectronNET.API;
using Microsoft.AspNetCore;
using MinecraftStudio.Internal.Logging;

namespace MinecraftStudio
{
    public class Program
    {
        public static void Main(string[] args)
        {
            InternalLog.Info("Starting Application", Origin.MAIN);
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseElectron(args)
                .UseStartup<Startup>();
        }
    }
}
