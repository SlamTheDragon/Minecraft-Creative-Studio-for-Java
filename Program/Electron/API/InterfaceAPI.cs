using ElectronNET.API;

// Electron Communicator
// Configure methods you want to pass to the renderer
namespace MinecraftStudio.Interface
{
    public class InterfaceAPI
    {
        public static InterfaceAPI push = new InterfaceAPI();
        private Dictionary<string, Action<string, Object>> menuRegistrator = new Dictionary<string, Action<string, Object>>();
        private InterfaceAPI()
        {
            
        }
        public void Register()
        {
            menuRegistrator.Add("menu-for-webview", (Key, args) => { MenuBar.MenuBarCreator.CreateMenus(true); });
            foreach (var item in menuRegistrator)
            {
                if (item.Key.StartsWith("webview-") == false)
                {
                    Electron.IpcMain.On(item.Key, (args) => { item.Value(item.Key, args); });
                }
            }

            MenuBar.MenuBarCreator.CreateMenus(true);
        }
        
        private void Reply(string ipc, params Object[] data)
        {
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            Electron.IpcMain.Send(mainWindow, ipc + "-reply", data);
        }

        public void OpenDevToolsWebView()
        {
            Reply("open-dev-tools-webview");
        }
        
        public void BrowserBackWebView()
        {
            Reply("browser-back-webview");
        }
    }
}