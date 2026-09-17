import { contextBridge, ipcRenderer } from 'electron'

const electron = {
  ipcRenderer: {
    send: (channel: string, ...args: unknown[]) => ipcRenderer.send(channel, ...args),
    invoke: (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args)
  }
}

const api = {
  launch: () => ipcRenderer.invoke('launch'),
  isRunning: () => ipcRenderer.invoke('is-running') as Promise<boolean>,
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electron', electron)
  contextBridge.exposeInMainWorld('api', api)
} else {
  ;(window as any).electron = electron
  ;(window as any).api = api
}