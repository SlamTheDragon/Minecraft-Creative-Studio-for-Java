using Microsoft.AspNetCore.Mvc;
using ElectronNET.API;

// Copied from ElectronNET Demo
// to be revised
namespace MinecraftStudio.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> IndexAsync()
        {
            var viewPath = $"https://bit.ly/slamthedragon";

            /*****************************************************************/
            //
            //  Custom WebSocket Middleware will be used instead before
            //  reaching in ElectronNET's API
            //
            /*****************************************************************/
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