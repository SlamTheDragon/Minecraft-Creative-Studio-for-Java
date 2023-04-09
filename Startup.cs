using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Process
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
            services.AddHttpsRedirection(opt => opt.HttpsPort = 443);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("./Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => 
            {
            endpoints.MapRazorPages();
            });
            
            if (HybridSupport.IsElectronActive)
            {   
                Task.Run(() => CreateWindow());
            }
        }

        private async void CreateWindow()
        {
            var window = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                Width = 1152,
                Height = 642,
                Show = true
            }).ConfigureAwait(false);

            await window.WebContents.Session.ClearCacheAsync();

            window.OnClosed += () => {
                Electron.App.Quit();
            };
        }

        private static void AddDevelopmentTests()
        {
            // NOTE: on mac you will need to allow the app to post notifications when asked.

            Electron.App.On("activate", (obj) =>
            {
                // obj should be a boolean that represents where there are active windows or not.
                var hasWindows = (bool)obj;

                Electron.Notification.Show(
                    new NotificationOptions("Activate", $"activate event has been captured. Active windows = {hasWindows}")
                    {
                        Silent = false,
                    });
            });

            Electron.Dock.SetMenu(new[]
            {
                new MenuItem
                {
                    Type = MenuType.normal,
                    Label = "MenuItem",
                    Click = () =>
                    {
                        Electron.Notification.Show(new NotificationOptions(
                            "Dock MenuItem Click",
                            "A menu item added to the Dock was selected;"));
                    },
                },
                new MenuItem
                {
                    Type = MenuType.submenu,
                    Label = "SubMenu",
                    Submenu = new[]
                    {
                        new MenuItem
                        {
                            Type = MenuType.normal,
                            Label = "Sub MenuItem",
                            Click = () =>
                            {
                                Electron.Notification.Show(new NotificationOptions(
                                    "Dock Sub MenuItem Click",
                                    "A menu item added to the Dock was selected;"));
                            },
                        },
                    }
                }
            });
        }
    }
}