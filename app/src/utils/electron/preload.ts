import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
    loadPreferences: () => ipcRenderer.invoke('load-prefs')
})