import { app, shell, BrowserWindow, ipcMain, protocol, net } from 'electron';
import { join } from 'path';
import { pathToFileURL } from 'url'
import { electronApp, optimizer, is } from '@electron-toolkit/utils';

import { findGamePath } from './functions/paths/findGamePath'
import { findModsPath } from './functions/paths/findModsPath'
import { findSteamPath } from './functions/paths/findSteamPath'

import { store } from './store';

import { scanBikes } from './functions/scan/bikes';

import { isRunning } from './functions/launch/isRunning';
import { writePracticeIni } from './functions/launch/writePracticeIni';
import { launch } from './functions/launch/launch';
import { GAME_APP_ID, PRACTICE_LAUNCH_ARGS } from './constants';

protocol.registerSchemesAsPrivileged([
  { scheme: 'local-file', privileges: { standard: true, secure: true, supportFetchAPI: true } }
])

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1478,
    height: 950,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    title: 'Launcher',
    show: false,
    autoHideMenuBar: false,
    frame: false,
    roundedCorners: false,
    icon: join(__dirname, '..', '..', 'resources', 'icon.png'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  ipcMain.on('minimize', () => mainWindow?.minimize())
  ipcMain.on('close', () => mainWindow?.close())

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

function registerLocalFileProtocolHandler(): void {
  protocol.handle('local-file', (request) => {
    const requestedPath = decodeURIComponent(new URL(request.url).pathname)
    // On Windows, the pathname keeps a leading slash before the drive letter
    // (e.g. "/C:/Users/x"), which pathToFileURL doesn't accept — strip it.
    const filePath = requestedPath.replace(/^\/([A-Za-z]:)/, '$1')
    return net.fetch(pathToFileURL(filePath).toString())
  })
}

function registerAppIpcHandlers(): void {
  ipcMain.handle('store:get', (_e, key: string) => store.get(key))
  ipcMain.handle('store:set', (_e, key: string, value: unknown) => store.set(key, value))

  ipcMain.handle('get-bikes', () => scanBikes())

  ipcMain.handle('is-running', () => isRunning())

  ipcMain.handle('launch', async () => {
    const [steamExe, gamePath] = await Promise.all([findSteamPath(), findGamePath()])
    if (!steamExe) throw new Error('Steam not found.')
    if (!gamePath) throw new Error('Game folder not found.')
    writePracticeIni(gamePath)
    return launch(steamExe, GAME_APP_ID, PRACTICE_LAUNCH_ARGS).catch((error) => {
      console.error('Failed to execute:', error)
      throw error
    })
  })
}

registerAppIpcHandlers()

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  registerLocalFileProtocolHandler()

  createWindow();

  console.log('Steam Path:', findSteamPath())
  console.log('Game Path:', findGamePath())
  console.log('Mods Path:', findModsPath())

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});