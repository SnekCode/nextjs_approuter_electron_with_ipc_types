import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: async (channel: string, data: any) => ipcRenderer.invoke(channel, data),
    send: (channel: string, data: any) => ipcRenderer.send(channel, data),
    on: (channel: string, listener: (event: any, ...args: any[]) => void) => ipcRenderer.on(channel, listener),
  },
});
