import { useEffect, useState } from "react";
import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";
import Launch from "../components/practice/launch";

import { Bike } from "../../../types/bikes";

export default function Practice(): React.JSX.Element {
  const [setup, setSetup] = useState<Bike | null>(null)

  useEffect(() => {
    window.store.get('setup.bike').then((stored) => {
      if (stored) setSetup(stored as Bike)
    })
  }, [])

  return (
    <Layout>
      <div className="grid grid-cols-[24vw_24vw_1fr] gap-2 h-full overflow-hidden items-start">
        <Preview src={setup?.preview ?? undefined} name={setup?.name || setup?.id} to="/bikes" />
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