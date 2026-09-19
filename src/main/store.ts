import Store from 'electron-store'

export interface StoreSchema {
  practice: {
    bike: {
      bike_id: string
      paint: string
      rider: string
      helmet: string
      helmet_paint: string
      suit_paint: string
      riding_style: string
    }
    track: {
      track_id: string
      track_layout: string
    }
    settings: {
      weather_realistic: number
      weather_conditions: number
      temperature: number
      wind_direction: number
      wind_speed: number
      track_conditions: number
    }
    dynamicsurface: {
      disable: number
    }
  },
  setup: {
    bike: {
      id: string
      name: string
    }
    track: {
      id: string
      name: string
    }
  }
}

export const store = new Store<StoreSchema>({
  defaults: {
    practice: {
      bike: {
        bike_id: 'schwaben_m2_18',
        paint: '',
        rider: 'modern',
        helmet: 'default',
        helmet_paint: '',
        suit_paint: '',
        riding_style: 'modern'
      },
      track: {
        track_id: 'Victoria',
        track_layout: ''
      },
      settings: {
        weather_realistic: 0,
        weather_conditions: 0,
        temperature: 25,
        wind_direction: 0,
        wind_speed: 0,
        track_conditions: 0
      },
      dynamicsurface: {
        disable: 0
      }
    },
    setup: {
      bike: {
        id: '',
        name: ''
      },
      track: {
        id: '',
        name: ''
      }
    }
  }
})