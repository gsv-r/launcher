import * as os from 'os'
import * as path from 'path'
import * as fs from 'fs'

const MODS_PATH = path.join(os.homedir(), 'Documents', 'PiBoSo', 'GP Bikes', 'mods')

export function findModsPath(): string | null {
  return fs.existsSync(MODS_PATH) ? MODS_PATH : null
}