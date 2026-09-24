import * as fs from 'fs/promises'
import * as path from 'path'
import { findModsPath } from '../paths/findModsPath'
import { prepareBikes } from '../prepare/bikes'

import { PREVIEW_IMAGE_FILENAMES, PAINT_FILE_EXTENSION } from '../../constants'

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
  paints: string[]
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

async function findPaints(bikeDir: string): Promise<string[]> {
  const paintsDir = path.join(bikeDir, 'paints')
  try {
    const entries = await fs.readdir(paintsDir, { withFileTypes: true })
    return entries
      .filter(
        (e) => e.isFile() && e.name.toLowerCase().endsWith(PAINT_FILE_EXTENSION)
      )
      .map((e) => path.basename(e.name, path.extname(e.name)))
  } catch {
    // pasta paints não existe ou não pôde ser lida
    return []
  }
}

async function loadBike(bikeDir: string): Promise<Bike | null> {
  let metadata: BikeMetadata
  try {
    const raw = await fs.readFile(path.join(bikeDir, 'metadata.json'), 'utf-8')
    metadata = JSON.parse(raw) as BikeMetadata
  } catch {
    return null
  }

  const [preview, paints] = await Promise.all([
    findPreview(bikeDir),
    findPaints(bikeDir),
  ])

  return { ...metadata, preview, paints }
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
  
  return bikes.filter((bike): bike is Bike => bike !== null)
}