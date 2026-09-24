import { useEffect, useState } from 'react'

export type Paint = { paint: string }

type PaintsProps = {
  paints: Paint[]
}

export default function Paints({ paints }: PaintsProps) {
  const [paint, setPaint] = useState<string>(paints[0]?.paint ?? '')

  useEffect(() => {
    if (paints.length === 0) {
      setPaint('')
      return
    }

    window.store.get('practice.bike.paint').then((stored) => {
      if (stored && paints.some((p) => p.paint === stored)) {
        setPaint(stored as string)
      } else {
        setPaint(paints[0].paint)
      }
    })
  }, [paints])

  function selectPaint(value: string) {
    setPaint(value)
    window.store.set('practice.bike.paint', value)
  }

  const isEmpty = paints.length === 0

  return (
    <select
      value={paint}
      disabled={isEmpty}
      onChange={(e) => selectPaint(e.target.value)}
      className="w-full appearance-none border-none bg-neutral-900 p-2 tracking-wide text-neutral-400 outline-none cursor-pointer uppercase disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isEmpty ? (
        <option value="">Not found</option>
      ) : (
        paints.map((p) => (
          <option key={p.paint} value={p.paint}>
            {p.paint}
          </option>
        ))
      )}
    </select>
  )
}