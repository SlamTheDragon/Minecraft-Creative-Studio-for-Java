using ElectronNET.API.Entities;
using ElectronNET.API;
using MinecraftStudio.Register;

namespace MinecraftStudio.Menu
{
    public class MenuCreator
    {
        static public void CreateMenus(bool addWebViewItems)
        {
            if (HybridSupport.IsElectronActive)
            {
                var menu = new MenuItem[] {
                    new MenuItem { Label = "Developer", Submenu = new MenuItem[] {
                        new MenuItem
                        {
                            Label = "Reload",
                            Accelerator = "CmdOrCtrl+R",
                            Click = () =>
                            {
                                Electron.WindowManager.BrowserWindows.ToList().ForEach(browserWindow => {
                                    browserWindow.Reload();
                                });
                            }
                        },
                        new MenuItem
                        {
                            Label = "Open Developer Tools",
                            Accelerator = "F12",
                            Click = () => Electron.WindowManager.BrowserWindows.First().WebContents.OpenDevTools()
                        },
                        new MenuItem { Type = MenuType.separator },
                        new MenuItem
                        {
                            Label = "Open Inner Developer Tools",
                            Accelerator = "CmdOrCtrl+Shift+I",
                            Visible = addWebViewItems,
                            Click = () => RegisterIpc.Impl.OpenDevToolsWebView()
                        },
                        new MenuItem
                        {
                            Label = "Inner Back Button",
                            Accelerator = "CmdOrCtrl+Shift+B",
                            Visible = addWebViewItems,
                            Click = () => RegisterIpc.Impl.BrowserBackWebView()
                        },
                    }},
                    new MenuItem { Label = "View", Submenu = new MenuItem[] {
                        new MenuItem
                        {
                            Label = "Toggle Fullscreeen",
                            Accelerator = "F11",
                            Click = async () =>
                            {
                                bool isFullScreen = await Electron.WindowManager.BrowserWindows.First().IsFullScreenAsync();
                                Electron.WindowManager.BrowserWindows.First().SetFullScreen(!isFullScreen);
                            }
                        }
                    }}
                };
                Electron.Menu.SetApplicationMenu(menu);
                CreateContextMenu();
            }
        }
        static private void CreateContextMenu()
        {
            var mainWindow = Electron.WindowManager.BrowserWindows.First();

            Electron.IpcMain.On("show-context-menu", (args) =>
            {
                Electron.Menu.ContextMenuPopup(mainWindow);
            });
        }
    }
}