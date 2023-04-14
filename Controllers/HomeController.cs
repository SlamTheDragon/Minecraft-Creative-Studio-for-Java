using Microsoft.AspNetCore.Mvc;
using ElectronNET.API;

// Copied from ElectronNET Demo
namespace MinecraftStudio.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}