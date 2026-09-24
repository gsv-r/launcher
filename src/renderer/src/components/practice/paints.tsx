import { useEffect, useState } from 'react'

export type Paint = { paint: string }

type PaintsProps = {
  paints: Paint[]
}

const BASE = '--base--'

export default function Paints({ paints }: PaintsProps) {
  const [paint, setPaint] = useState<string>(BASE)

  const isEmpty = paints.length === 0

  useEffect(() => {
    if (isEmpty) return

    window.store.get('practice.bike.paint').then((stored) => {
      if (stored === BASE || paints.some((p) => p.paint === stored)) {
        setPaint(stored as string)
      } else {
        setPaint(BASE)
      }
    })
  }, [paints, isEmpty])

  function selectPaint(value: string) {
    setPaint(value)
    window.store.set('practice.bike.paint', value)
  }

  return (
    <select
      value={isEmpty ? '' : paint}
      disabled={isEmpty}
      onChange={(e) => selectPaint(e.target.value)}
      className="w-full appearance-none border-none bg-neutral-900 p-2 tracking-wide text-neutral-400 outline-none cursor-pointer uppercase disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isEmpty ? (
        <option value="">not found</option>
      ) : (
        <>
          <option value={BASE}>--base--</option>
          {paints.map((p) => (
            <option key={p.paint} value={p.paint}>
              {p.paint}
            </option>
          ))}
        </>
      )}
    </select>
  )
}