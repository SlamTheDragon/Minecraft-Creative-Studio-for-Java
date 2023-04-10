using ElectronNET.API;
using ElectronNET.API.Entities;
using IHostingEnvironment = Microsoft.Extensions.Hosting.IHostingEnvironment;

namespace SystemStartup
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddMemoryCache();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseWebSockets();

            if (HybridSupport.IsElectronActive)
            {
                ElectronBootstrap();
            }

        }

        public async void ElectronBootstrap()
        {
            var prefs = new BrowserWindowOptions
            {
                Width = 1152,
                Height = 690,
                Show = false,
                WebPreferences = new WebPreferences { WebSecurity = false }
            };
            var browserWindow = await Electron.WindowManager.CreateWindowAsync(prefs);
            browserWindow.OnReadyToShow += () => browserWindow.Show();
            // RegisterIpc.Impl.Register();
        }
    }
}