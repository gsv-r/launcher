import { useEffect, useState } from 'react'

type LaunchStatus = 'idle' | 'launch' | 'running' | 'stopping'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const labelMap: Record<LaunchStatus, string> = {
  idle: 'Launch',
  launch: 'Launching',
  running: 'Running',
  stopping: 'Stopping'
}

export default function Launch({ version = '0.1.0' }: { version?: string }) {
  const [status, setStatus] = useState<LaunchStatus>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const interval = setInterval(async () => {
      const running = (await window.api.isRunning()) as boolean
      if (status === 'launch' && running) {
        await sleep(1900)
        setStatus('running')
        clearInterval(interval)
      } else if (status === 'running' && !running) {
        setStatus('stopping')
        await sleep(1900)
        setStatus('idle')
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  const launch = async () => {
    if (status !== 'idle') return
    try {
      setStatus('launch')
      await sleep(1900)
      await window.api.launch()
    } catch (err) {
      console.error(err)
      setStatus('idle')
    }
  }

  return (
    <div className="mt-auto">
      <div className="col-span-1 row-span-2 flex flex-col justify-end py-10 px-12 gap-2">
        <button
          onClick={launch}
          disabled={status !== 'idle'}
          className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:enabled:from-blue-600 hover:enabled:to-blue-700 disabled:opacity-70 text-white text-xl uppercase tracking-widest flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          {status !== 'idle' && (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {labelMap[status]}
        </button>
        <p className="text-neutral-500 text-sm">version {version}</p>
      </div>
    </div>
  )
}