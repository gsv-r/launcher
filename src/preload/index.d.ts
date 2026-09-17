export {}

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
    }
  }
}