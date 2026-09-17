import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export async function launch(steamExe: string, appId: string, args: string): Promise<string> {
  const { stdout, stderr } = await execAsync(`"${steamExe}" -applaunch ${appId} ${args}`)

  // steam.exe costuma escrever no stderr mesmo quando o launch funciona,
  // então isso é só informativo, não indica erro de verdade.
  if (stderr) console.log('Launch stderr:', stderr.trim())

  return stdout
}