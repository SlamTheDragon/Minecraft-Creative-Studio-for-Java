using System.Net;
using System.Net.NetworkInformation;
using System.Text;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Hosting.Server.Features;
using MinecraftStudio.InterfaceAPI;
using MinecraftStudio.Internal.Logging;
using WebSocketServer.Middleware;


namespace MinecraftStudio
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddWebSocketManager();
            services.AddLogging();
        }

        private string TempPath { get; set; }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // TODO: Move this bridge instructions

            var serverAddressesFeature = app.ServerFeatures.Get<IServerAddressesFeature>();
            var addresses = serverAddressesFeature!.Addresses;

            string appName = "Minecraft Creative Studio";
            string appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            string GeneralFolderPath = Path.Combine(appDataFolder, appName);

            if (!Directory.Exists(GeneralFolderPath))
            {
                Directory.CreateDirectory(GeneralFolderPath);
            }

            this.TempPath = Path.Combine(GeneralFolderPath, "MCSStartup");

            try
            {
                foreach (var address in addresses)
                {
                    InternalLog.Debug($"Listening on address: {address}", Origin.MAIN);

                    using (FileStream write = File.Create(TempPath))
                    {
                        byte[] bytes = new UTF8Encoding(true).GetBytes(address);
                        write.Write(bytes, 0, bytes.Length);
                    }
                }
            }
            catch (System.UnauthorizedAccessException e)
            {
                // FIXME: why is this thing kept having some permission issues lol
                InternalLog.Error(e.ToString(), Origin.MAIN);
                throw e;
            }

            // Move this to a code when the frontend has recieved the file
            // 
            // if (Directory.Exists(TempPath))
            // {
            //     Directory.Delete(TempPath);
            // }

            if (env.IsDevelopment())
            {
                InternalLog.Debug("Environment: Development", Origin.MAIN);
                app.UseDeveloperExceptionPage();
            }

            InternalLog.Info("Starting Server", Origin.SERVER);
            app.UseStaticFiles();
            app.UseRouting();
            app.UseWebSockets();
            app.UseWebSocketServer();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

            // Might be useful for later
            // Get all active TCP listeners
            // IPGlobalProperties properties = IPGlobalProperties.GetIPGlobalProperties();
            // TcpConnectionInformation[] connections = properties.GetActiveTcpConnections();

            // foreach (TcpConnectionInformation connection in connections)
            // {
            //     InternalLog.Debug("Port: " + connection.LocalEndPoint.Port, Origin.SERVER);
            //     Console.WriteLine();
            // }

            InternalLog.Info("Starting Interface", Origin.INTERFACE);
            InternalLog.Debug("Is Interface Ready: " + HybridSupport.IsElectronActive, Origin.INTERFACE);
            if (HybridSupport.IsElectronActive)
            {
                Window();
            }
        }

        public async void Window()
        {
            string appName = "Minecraft Creative Studio";
            string appDataFolder = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);
            string logFolderPath = Path.Combine(appDataFolder, appName, "Interface");

            // create the directory if it doesn't exist
            if (!Directory.Exists(logFolderPath))
            {
                Directory.CreateDirectory(logFolderPath);
            }

            Electron.App.SetPath(PathName.AppData, logFolderPath);

            var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                MinWidth = 800,
                Width = 1152,
                MinHeight = 670,
                Height = 670,
                Show = false
            });

            await browserWindow.WebContents.Session.ClearCacheAsync();
            browserWindow.OnReadyToShow += () => browserWindow.Show();

            InternalLog.Info("Interface Started", Origin.INTERFACE);
            InternalLog.Info("Injecting necessary components...", Origin.INTERFACE);

            Interface.push.Register();
            InternalLog.Info("Done", Origin.INTERFACE);
        }
    }
}