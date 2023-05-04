using ElectronNET.API;
using MinecraftStudio.Menu;


namespace MinecraftStudio.Register
{
    public class RegisterIpc
    {
        public static RegisterIpc Impl = new RegisterIpc();
        private Dictionary<string, Action<string, Object>> mRegister = new Dictionary<string, Action<string, Object>>();
        private RegisterIpc()
        {

        }
        public void Register()
        {
            mRegister.Add("menu-for-webview", (Key, args) => { MenuCreator.CreateMenus(true); });
            foreach (var item in mRegister)
            {
                if (item.Key.StartsWith("webview-") == false)
                {
                    Electron.IpcMain.On(item.Key, (args) => { item.Value(item.Key, args); });
                }
            }
            MenuCreator.CreateMenus(false);
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