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
                                // on reload, start fresh and close any old
                                // open secondary windows
                                Electron.WindowManager.BrowserWindows.ToList().ForEach(browserWindow => {
                                    // if(browserWindow.Id != 1)
                                    // {
                                    //     browserWindow.Close();
                                    // }
                                    // else
                                    // {
                                        browserWindow.Reload();
                                    // }
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
                };
                Electron.Menu.SetApplicationMenu(menu);
                CreateContextMenu();
            }
        }
        static private void CreateContextMenu()
        {
            // var menu = new MenuItem[]
            // {
            //     new MenuItem
            //     {
            //         Label = "Test 1",
            //         Click = async () => await Electron.Dialog.ShowMessageBoxAsync("Success")
            //     },
            //     new MenuItem { Type = MenuType.separator },
            //     new MenuItem { Label = "Test 2", Type = MenuType.checkbox, Checked = true }
            // };
            var mainWindow = Electron.WindowManager.BrowserWindows.First();
            // Electron.Menu.SetContextMenu(mainWindow, menu);
            Electron.IpcMain.On("show-context-menu", (args) =>
            {
                Electron.Menu.ContextMenuPopup(mainWindow);
            });
        }
    }
}