import { contextBridge, ipcRenderer } from 'electron'
import { Bike } from '../types/bikes'

const electron = {
  ipcRenderer: {
    send: (channel: string, ...args: unknown[]) => ipcRenderer.send(channel, ...args),
    invoke: (channel: string, ...args: unknown[]) => ipcRenderer.invoke(channel, ...args)
  }
}

const api = {
  launch: () => ipcRenderer.invoke('launch'),
  isRunning: () => ipcRenderer.invoke('is-running') as Promise<boolean>,
  getBikes: () => ipcRenderer.invoke('get-bikes') as Promise<Bike[]>
}

const store = {
  get: (key: string) => ipcRenderer.invoke('store:get', key),
  set: (key: string, value: unknown) => ipcRenderer.invoke('store:set', key, value)
}

if (process.contextIsolated) {
  contextBridge.exposeInMainWorld('electron', electron)
  contextBridge.exposeInMainWorld('api', api)
} else {
  ;(window as any).electron = electron
  ;(window as any).api = api
  ;(window as any).store = store
}