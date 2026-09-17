import * as path from 'path'
import * as fs from 'fs'
import { findSteamPath } from './findSteamPath'
import { GAME_APP_ID } from '../constants/index'

function parseLibraryPaths(vdfContent: string, steamDir: string): string[] {
  const matches = vdfContent.matchAll(/"(?:path|\d+)"\s+"([^"]+)"/g)
  return [...new Set([steamDir, ...Array.from(matches, (m) => m[1].replace(/\\\\/g, '\\'))])]
}

function resolveGamePath(libraryPath: string, appId: string): string | null {
  const manifestPath = path.join(libraryPath, 'steamapps', `appmanifest_${appId}.acf`)
  if (!fs.existsSync(manifestPath)) return null

  const installDir = fs.readFileSync(manifestPath, 'utf-8').match(/"installdir"\s*"([^"]+)"/i)?.[1]
  if (!installDir) return null

  const gamePath = path.join(libraryPath, 'steamapps', 'common', installDir)
  return fs.existsSync(gamePath) ? gamePath : null
}

export function findGamePath(appId = GAME_APP_ID): string | null {
  const steamExe = findSteamPath()
  if (!steamExe) return null

  const vdfPath = path.join(path.dirname(steamExe), 'steamapps', 'libraryfolders.vdf')
  if (!fs.existsSync(vdfPath)) return null

  const libraries = parseLibraryPaths(fs.readFileSync(vdfPath, 'utf-8'), path.dirname(steamExe))

  for (const libraryPath of libraries) {
    const gamePath = resolveGamePath(libraryPath, appId)
    if (gamePath) return gamePath
  }

  return null
}