import * as fs from 'fs/promises'
import * as path from 'path'
import { findModsPath } from '../paths/findModsPath'

import { MOD_FILE_EXTENSION } from '../../constants'

export async function prepareTracks(): Promise<string[] | false> {
  const modsPath = findModsPath()
  if (!modsPath) return false

  const tracksPath = path.join(modsPath, 'tracks')

  let entries
  try {
    entries = await fs.readdir(tracksPath, { withFileTypes: true })
  } catch {
    return false
  }

  const pkzNames = entries
    .filter((e) => e.isFile() && e.name.endsWith(MOD_FILE_EXTENSION))
    .map((e) => path.basename(e.name, MOD_FILE_EXTENSION))

  const dirNames = entries
    .filter((e) => e.isDirectory() && !pkzNames.includes(e.name))
    .map((e) => e.name)

  const tracks = [...pkzNames, ...dirNames]

  await Promise.all(
    tracks.map(async (track) => {
      const trackDir = path.join(tracksPath, track)

      await fs.mkdir(trackDir, { recursive: true })

      try {
        await fs.writeFile(
          path.join(trackDir, 'metadata.json'),
          JSON.stringify({
            id: track,
            name: '',
            country: '',
            length: 0,
            version: '1.0',
            author: '',
          }),
          { flag: 'wx' } // não sobrescreve se já existir
        )
      } catch {
        // metadata.json já existe, ok
      }
    })
  )

  return tracks
}