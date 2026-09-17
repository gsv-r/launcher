import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'

const STEAM_EXE_PATH = (dir: string) => path.join(dir, 'steam.exe')

export function findSteamPath(): string | null {
  try {
    const stdout = execSync('reg query "HKEY_CURRENT_USER\\Software\\Valve\\Steam" /v SteamPath', { encoding: 'utf-8' })
    const steamDir = path.normalize(stdout.match(/SteamPath\s+REG_SZ\s+(.+)/)?.[1]?.trim() ?? '')
    if (!steamDir) return null

    const steamExe = STEAM_EXE_PATH(steamDir)
    return fs.existsSync(steamExe) ? steamExe : null
  } catch {
    return null
  }
}