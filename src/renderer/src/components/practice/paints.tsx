import { useEffect, useState } from 'react'

export type Paint = { paint: string }

type PaintsProps = {
  paints: Paint[]
}

export default function Paints({ paints }: PaintsProps) {
  const [paint, setPaint] = useState<string>(paints[0]?.paint ?? '')

  useEffect(() => {
    window.store.get('practice.bike.paint').then((stored) => {
      if (stored && paints.some((p) => p.paint === stored)) {
        setPaint(stored as string)
      } else {
        setPaint(paints[0]?.paint ?? '')
      }
    })
  }, [paints])

  function selectPaint(value: string) {
    setPaint(value)
    window.store.set('practice.bike.paint', value)
  }

  return (
    <select
      value={paint}
      onChange={(e) => selectPaint(e.target.value)}
      className="w-full appearance-none border-none bg-neutral-900 p-2 tracking-wide text-neutral-400 outline-none cursor-pointer uppercase"
    >
      {paints.map((p) => (
        <option key={p.paint} value={p.paint}>{p.paint}</option>
      ))}
    </select>
  )
}