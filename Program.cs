using Microsoft.AspNetCore;
using ElectronNET.API;
using Microsoft.AspNetCore.Hosting;


namespace SampleApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) => WebHost.CreateDefaultBuilder(args).UseStartup<Startup>().UseElectron(args).Build();
    }
}
