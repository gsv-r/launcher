import { useEffect, useState } from "react";
import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";
import Launch from "../components/practice/launch";

import { Bike } from "../../../types/bikes";

const PAINTS = [
  { paint: 'Garrett Gerloff #31' },
  { paint: 'Scott Redding #45' },
]

export default function Practice(): React.JSX.Element {
  const [setup, setSetup] = useState<Bike | null>(null)
  const [paint, setPaint] = useState<string>(PAINTS[0].paint)

  useEffect(() => {
    window.store.get('setup.bike').then((stored) => {
      if (stored) setSetup(stored as Bike)
    })

    window.store.get('practice.bike.paint').then((stored) => {
      if (stored && PAINTS.some((p) => p.paint === stored)) setPaint(stored as string)
    })
  }, [])

  function selectPaint(value: string) {
    setPaint(value)
    window.store.set('practice.bike.paint', value)
  }

  return (
    <Layout>
      <div className="grid grid-cols-[24vw_24vw_1fr] gap-2 h-full overflow-hidden items-start">
        <div className="flex flex-col gap-2">
          <Preview src={setup?.preview ?? undefined} name={setup?.name || setup?.id || "schwaben_m2_18"} to="/bikes" />
          <select
            value={paint}
            onChange={(e) => selectPaint(e.target.value)}
            className="w-full appearance-none border-none bg-neutral-900 px-2 py-2 text-sm tracking-wide text-neutral-400 outline-none cursor-pointer uppercase"
          >
            {PAINTS.map((p) => (
              <option key={p.paint} value={p.paint}>{p.paint}</option>
            ))}
          </select>
        </div>
        <div>
          {/* track */}
        </div>
        <div>
          {/* weather */}
        </div>
        <Launch />
      </div>
    </Layout>
  );
}