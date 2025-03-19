export interface IChannel {
  // These channels describe the ipc communication between the main and renderer processes
  // Exceptions are that communications flow from the renderer to the main process
  "ping": { args: string; return: string };
  "object": { args: { key: string; value: number }; return: string };
}

export type ChannelKeys = keyof IChannel;
export type ChannelArgs<T extends ChannelKeys> = IChannel[T]['args'];
export type ChannelReturn<T extends ChannelKeys> = IChannel[T]['return'];

export function handleIpcMain<T extends ChannelKeys>(
  channel: T,
  listener: (event: Electron.IpcMainInvokeEvent, args: ChannelArgs<T>) => ChannelReturn<T> | Promise<ChannelReturn<T>>
): void;

export function onIpcMain<T extends ChannelKeys>(
  channel: T,
  listener: (event: Electron.IpcMainInvokeEvent, args: ChannelArgs<T>) => void
): void;

// electron-window.d.ts
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: <T extends ChannelKeys>(channel: T, ...args: ChannelArgs<T>[]) => void;
        invoke: <T extends ChannelKeys>(channel: T, ...args: ChannelArgs<T>[]) => Promise<ChannelReturn<T>>;
        // Define other ipcRenderer methods you use here
      };
    };
  }
}

export {};
