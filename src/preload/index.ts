import { contextBridge, ipcRenderer } from 'electron';

const api = {
  ipcRenderer: {
    send: (channel: string, ...args: unknown[]) => {
      ipcRenderer.send(channel, ...args);
    },

    invoke: (channel: string, ...args: unknown[]) => {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
};

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electron', api);
} else {
  // @ts-expect-error Electron API
  window.electron = api;
}