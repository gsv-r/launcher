export { }

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: unknown[]) => void
        invoke: <T = unknown>(channel: string, ...args: unknown[]) => Promise<T>
      }
    }
    api: {
      launch: () => Promise<void>
      isRunning: () => Promise<boolean>
      getBikes: () => Promise<Bike[]>
      getTracks: () => Promise<Track[]>
    }
    store: {
      get: <T = unknown>(key: string) => Promise<T>
      set: (key: string, value: unknown) => Promise<void>
    }
  }
}