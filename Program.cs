using ElectronNET.API;
using ElectronNET.WebApp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace Program
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseElectron(args);
                    webBuilder.UseEnvironment("Development");
                    webBuilder.ConfigureKestrel(options =>
                    {
                        options.ListenLocalhost(5000); // Replace with your desired port number
                    });
                    webBuilder.UseStartup<Startup>();
                });
    }
}