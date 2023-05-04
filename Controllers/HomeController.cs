using Microsoft.AspNetCore.Mvc;
using ElectronNET.API;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

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

        // public async Task SendMessage(string user, string message)
        // {
        //     // await Clients.All.SendAsync("ReceiveMessage", user, message);
        // }
    }
}