import { execSync } from 'child_process'
import { GAME_PROCESS_NAME } from '../../constants/index'

export function isRunning(): boolean {
  try {
    const out = execSync('tasklist').toString()
    return out.toLowerCase().includes(GAME_PROCESS_NAME)
  } catch {
    return false
  }
}