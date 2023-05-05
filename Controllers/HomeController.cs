using Microsoft.AspNetCore.Mvc;
using ElectronNET.API;
using System.Threading.Tasks;

// Copied from ElectronNET Demo
// to be revised
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