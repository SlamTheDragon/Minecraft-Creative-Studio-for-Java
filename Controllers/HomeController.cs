using Microsoft.AspNetCore.Mvc;
using ElectronNET.API;

// Copied from ElectronNET Demo
namespace MinecraftStudio.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {

            string viewPath = $"https://bit.ly/slamthedragon";

            Electron.IpcMain.On("new-window", async (args) =>
            {
                await Electron.WindowManager.CreateWindowAsync(viewPath);
            });
            
            return View();
        }

        public IActionResult NewWindow()
        {
            return View();
        }
    }
}