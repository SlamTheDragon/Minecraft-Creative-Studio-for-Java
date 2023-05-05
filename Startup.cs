using ElectronNET.API;
using ElectronNET.API.Entities;
using MinecraftStudio.Register;
using WebSocketServer.Middleware;

// TODO: Add Websockets for handling DOM events and Backend Events

namespace MinecraftStudio
{
    public class Startup
    {
        // ============================================================================================
        // The IConfiguration interface is used to provide access to application settings.By declaring
        // a Configuration property with type IConfiguration, you are providing access to the 
        // configuration data through the Configuration property.
        //
        // The Startup class constructor takes an instance of IConfiguration as a parameter.
        // The configuration parameter is used to access the application settings.
        // By creating an instance of the Startup class, you can configure the services that the
        // application will use and the middleware that will handle incoming requests.
        // ============================================================================================

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddWebSocketManager();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // checks if the hosting environment is set to "Development".
            // If so, it adds a developer exception page middleware that displays detailed information about
            // errors that occur during development.

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            Electron.WindowManager.BrowserWindows.ToList().ForEach(browserWindow =>
            {
                browserWindow.SetMinimumSize(800, 600);
            });

            app.UseRouting();
            app.UseWebSockets();
            app.UseWebSocketServer();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

            if (HybridSupport.IsElectronActive)
            {
                Window();
            }
        }

        public async void Window()
        {
            var browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                Width = 1152,
                Height = 670,
                Show = false
            });

            await browserWindow.WebContents.Session.ClearCacheAsync();
            browserWindow.OnReadyToShow += () => browserWindow.Show();
            RegisterIpc.Impl.Register();
        }
    }
}