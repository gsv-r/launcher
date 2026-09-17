import fs from 'fs'
import path from 'path'
import { store } from '../../store'

export async function createPracticeIni(gamePath: string) {
  const { practice } = store.store
  const { bike, track, settings, dynamicsurface } = practice

  const ini = `
    [bike]
    bike_id = ${bike.bike_id}
    paint = ${bike.paint}
    rider = ${bike.rider}
    helmet = ${bike.helmet}
    helmet_paint = ${bike.helmet_paint}
    suit_paint = ${bike.suit_paint}
    riding_style = ${bike.riding_style}

    [track]
    track_id = ${track.track_id}
    track_layout = ${track.track_layout}

    [settings]
    weather_realistic = ${settings.weather_realistic}
    weather_conditions = ${settings.weather_conditions}
    temperature = ${settings.temperature}
    wind_direction = ${settings.wind_direction}
    wind_speed = ${settings.wind_speed}
    track_conditions = ${settings.track_conditions}

    [dynamicsurface]
    disable = ${dynamicsurface.disable}
  `.trimStart()

  const filePath = path.join(gamePath, 'practice.ini')
  fs.writeFileSync(filePath, ini, 'utf-8')
}