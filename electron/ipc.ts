import { ipcMain } from "electron";
import { IChannel, ChannelKeys, ChannelArgs, ChannelReturn } from "../electron.d";

export function handleIpcMain<T extends ChannelKeys>(
  channel: T,
  listener: (event: Electron.IpcMainInvokeEvent, args: ChannelArgs<T>) => ChannelReturn<T> | Promise<ChannelReturn<T>>
): void {
  ipcMain.handle(channel, (event, args) => listener(event, args));
}

export function onIpcMain<T extends ChannelKeys>(
  channel: T,
  listener: (event: Electron.IpcMainInvokeEvent, args: ChannelArgs<T>) => void
): void {
  ipcMain.on(channel, listener);
}