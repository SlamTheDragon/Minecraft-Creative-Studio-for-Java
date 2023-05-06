using ElectronNET.API;
using ElectronNET.API.Entities;
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                // FIXME: inappropriate usage of Debug:
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