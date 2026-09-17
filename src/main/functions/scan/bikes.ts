import * as fs from 'fs/promises'
import * as path from 'path'
import { findModsPath } from '../paths/findModsPath'
import { prepareBikes } from '../prepare/bikes'

import { PREVIEW_IMAGE_FILENAMES } from '../../constants'

interface BikeMetadata {
  id: number;
  name: string;
  brand: string;
  class: string;
  year: number;
  version: string;
  author: string;
}

interface Bike extends BikeMetadata {
  preview: string | null
}

async function findPreview(bikeDir: string): Promise<string | null> {
  for (const filename of PREVIEW_IMAGE_FILENAMES) {
    const previewPath = path.join(bikeDir, filename)
    try {
      await fs.access(previewPath)
      return previewPath
    } catch {
      // arquivo não existe, tenta o próximo
    }
  }
  return null
}

async function loadBike(bikeDir: string): Promise<Bike | null> {
  let metadata: BikeMetadata
  try {
    const raw = await fs.readFile(path.join(bikeDir, 'metadata.json'), 'utf-8')
    metadata = JSON.parse(raw) as BikeMetadata
  } catch {
    return null
  }

  const preview = await findPreview(bikeDir)

  return { ...metadata, preview }
}

export async function scanBikes(): Promise<Bike[] | false> {
  const modsPath = findModsPath()
  if (!modsPath) return false

  const bikeIds = await prepareBikes()
  if (!bikeIds) return false

  const bikesPath = path.join(modsPath, 'bikes')

  const bikes = await Promise.all(
    bikeIds.map((id) => loadBike(path.join(bikesPath, id)))
  )

  console.log(bikes.filter((bike) => bike !== null))
  return bikes.filter((bike): bike is Bike => bike !== null)
}