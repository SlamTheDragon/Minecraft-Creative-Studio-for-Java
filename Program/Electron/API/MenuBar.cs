using ElectronNET.API.Entities;
using ElectronNET.API;


namespace MinecraftStudio.MenuBar
{
    public class MenuBarCreator
    {
        // TODO: Migrate later
        bool isDeveloper = true;

        static public void CreateMenus(bool addWebViewItems)
        {
            if (HybridSupport.IsElectronActive)
            {
                var menu = new MenuItem[] {
                    new MenuItem { Label = "View", Submenu = new MenuItem[] {
                        new MenuItem
                        {
                            Label = "Developer Tools",
                            Type = MenuType.submenu,
                            Visible = addWebViewItems,
                            Enabled = false,
                            Submenu = new MenuItem[] {
                                new MenuItem
                                {
                                    Label = "Reload",
                                    Accelerator = "CmdOrCtrl+R",
                                    Visible = addWebViewItems,
                                    Click = () =>
                                    {
                                        // on reload, start fresh and close any old
                                        // open secondary windows
                                        var mainWindowId = Electron.WindowManager.BrowserWindows.ToList<BrowserWindow>().First().Id;
                                        Electron.WindowManager.BrowserWindows.ToList<BrowserWindow>().ForEach(browserWindow => {
                                            if(browserWindow.Id != mainWindowId)
                                            {
                                                browserWindow.Close();
                                            }
                                            else
                                            {
                                                browserWindow.Reload();
                                            }
                                        });
                                    }
                                },
                                new MenuItem
                                {
                                    Label = "Open Developer Tools",
                                    Accelerator = "F12",
                                    Visible = addWebViewItems,
                                    Click = () => Electron.WindowManager.BrowserWindows.First<BrowserWindow>().WebContents.OpenDevTools()
                                },
                                new MenuItem
                                {
                                    Type = MenuType.separator,
                                    Visible = addWebViewItems
                                },
                                new MenuItem
                                {
                                    Label = "Inner Back Button",
                                    Accelerator = "CmdOrCtrl+Shift+B",
                                    Visible = addWebViewItems,
                                    Click = () => Interface.InterfaceAPI.push.BrowserBackWebView()
                                }
                            }
                        },
                        new MenuItem
                        {
                            Label = "Toggle Fullscreeen",
                            Accelerator = "F11",
                            Visible = addWebViewItems,
                            Click = async () =>
                            {
                                bool isFullScreen = await Electron.WindowManager.BrowserWindows.First<BrowserWindow>().IsFullScreenAsync();
                                Electron.WindowManager.BrowserWindows.First<BrowserWindow>().SetFullScreen(!isFullScreen);
                                // FIXME:
                                // System.Console.WriteLine(
                                //     Electron.WindowManager.BrowserWindows.Count
                                // );
                            }
                        }
                    }}
                };


                var noMenu = new MenuItem[] { };

                if (addWebViewItems)
                {
                    Electron.Menu.SetApplicationMenu(menu);
                    CreateContextMenu();
                }
                else
                {
                    Electron.Menu.SetApplicationMenu(noMenu);
                    CreateContextMenu();
                }
            }
            
            System.Console.WriteLine(HybridSupport.IsElectronActive);
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