import * as fs from 'fs/promises'
import * as path from 'path'
import { findModsPath } from '../paths/findModsPath'
import { prepareTracks } from '../prepare/tracks'

import { PREVIEW_IMAGE_FILENAMES } from '../../constants'

interface TrackMetadata {
  id: number;
  name: string;
  country: string;
  length: number;
  version: string;
  author: string;
}

interface Track extends TrackMetadata {
  preview: string | null
  layouts: string[]
}

async function findPreview(trackDir: string): Promise<string | null> {
  for (const filename of PREVIEW_IMAGE_FILENAMES) {
    const previewPath = path.join(trackDir, filename)
    try {
      await fs.access(previewPath)
      return previewPath
    } catch {
      // arquivo não existe, tenta o próximo
    }
  }
  return null
}

async function findLayouts(trackDir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(trackDir, { withFileTypes: true })
    return entries.filter((e) => e.isDirectory()).map((e) => e.name)
  } catch {
    // pasta da track não existe ou não pôde ser lida
    return []
  }
}

async function loadTrack(trackDir: string): Promise<Track | null> {
  let metadata: TrackMetadata
  try {
    const raw = await fs.readFile(path.join(trackDir, 'metadata.json'), 'utf-8')
    metadata = JSON.parse(raw) as TrackMetadata
  } catch {
    return null
  }

  const [preview, layouts] = await Promise.all([
    findPreview(trackDir),
    findLayouts(trackDir),
  ])

  return { ...metadata, preview, layouts }
}

export async function scanTracks(): Promise<Track[] | false> {
  const modsPath = findModsPath()
  if (!modsPath) return false

  const trackIds = await prepareTracks()
  if (!trackIds) return false

  const tracksPath = path.join(modsPath, 'tracks')

  const tracks = await Promise.all(
    trackIds.map((id) => loadTrack(path.join(tracksPath, id)))
  )

  return tracks.filter((track): track is Track => track !== null)
}