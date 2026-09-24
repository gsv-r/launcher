import { useEffect, useState } from "react";
import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";
import Launch from "../components/practice/launch";
import Paints from "../components/practice/paints";

import { Bike } from "../../../types/bikes";
import { Track } from "../../../types/track";

export default function Practice(): React.JSX.Element {
  const [bike, setBike] = useState<Bike | null>(null)
  const [track, setTrack] = useState<Track | null>(null)

  useEffect(() => {
    window.store.get('setup.bike').then((stored) => {
      if (stored) setBike(stored as Bike)
    })
    window.store.get('setup.track').then((stored) => {
      if (stored) setTrack(stored as Track)
    })
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-[24vw_24vw_1fr] gap-2 h-full overflow-hidden items-start">
        <div className="flex flex-col gap-2">
          <Preview src={bike?.preview ?? undefined} name={bike?.name || bike?.id || "schwaben_m2_18"} to="/bikes" />
          <Paints paints={bike?.paints.map((p) => ({ paint: p })) ?? []} />
        </div>
        <div className="flex flex-col gap-2">
          <Preview src={track?.preview ?? undefined} name={track?.name || track?.id || "schwaben_m2_18"} to="/tracks" cover />
          <Paints paints={track?.layouts.map((l) => ({ paint: l })) ?? []} />
        </div>
        <div>
          {/* weather */}
        </div>
        <Launch />
      </div>
    </Layout>
  );
}