using ElectronNET.API;
using ElectronNET.API.Entities;
using MinecraftStudio.Register;

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
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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

            app.UseEndpoints(endpoints =>
            {
                // ============================================================================================
                // This code configures an endpoint to handle incoming HTTP requests.
                // In particular, it maps the URL pattern to a specific controller and action method.
                //
                // In the URL pattern, "{ controller }" and "{ action }" are placeholders for the controller
                // and action names, respectively.The optional "{ id }"
                // parameter can be used to pass additional information to the action method.
                //
                // So, for example, if the incoming URL is http://example.com/Products/Details/5, this would
                // map to the Details action method in the ProductsController class, with a parameter of id set
                // to 5. If no controller or action is specified in the URL, it would default to the Index
                // action of the HomeController class.
                // ============================================================================================

                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
            });

            if (HybridSupport.IsElectronActive)
            {
                ElectronBootstrap();
            }
        }

        public async void ElectronBootstrap()
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
