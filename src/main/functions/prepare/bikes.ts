import * as fs from 'fs/promises'
import * as path from 'path'
import { findModsPath } from '../paths/findModsPath'

import { MOD_FILE_EXTENSION } from '../../constants'

export async function prepareBikes(): Promise<string[] | false> {
  const modsPath = findModsPath()
  if (!modsPath) return false

  const bikesPath = path.join(modsPath, 'bikes')

  let entries
  try {
    entries = await fs.readdir(bikesPath, { withFileTypes: true })
  } catch {
    return false
  }

  const pkzNames = entries
    .filter((e) => e.isFile() && e.name.endsWith(MOD_FILE_EXTENSION))
    .map((e) => path.basename(e.name, MOD_FILE_EXTENSION))

  const dirNames = entries
    .filter((e) => e.isDirectory() && !pkzNames.includes(e.name))
    .map((e) => e.name)

  const bikes = [...pkzNames, ...dirNames]

  await Promise.all(
    bikes.map(async (bike) => {
      const bikeDir = path.join(bikesPath, bike)

      await fs.mkdir(bikeDir, { recursive: true })

      try {
        await fs.writeFile(
          path.join(bikeDir, 'metadata.json'),
          JSON.stringify({
            id: bike,
            name: '',
            brand: '',
            class: '',
            year: 0,
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

  return bikes
}