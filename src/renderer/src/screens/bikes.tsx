import { useEffect, useState } from 'react'
import { Link } from 'react-router';

import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";
import { Bike } from '../../../types/bikes'

export default function Bikes() {
  const [bikes, setBikes] = useState<Bike[]>([])
  const [setup, setSetup] = useState<Bike | null>(null)

  useEffect(() => {
    window.api.getBikes()
      .then((result) => setBikes(result as Bike[]))
      .catch((error) => console.error('Failed to fetch bikes:', error))

    window.store.get('setup.bike').then((stored) => {
      if (stored) setSetup(stored as Bike)
    })
  }, [])

  function selectBike(bike: Bike) {
    window.store.set('practice.bike.bike_id', bike.id)
    window.store.set('setup.bike', bike)
  }
  
  return (
    <Layout>
      <div className="grid grid-cols-[23vw_1fr] gap-2 items-start">
        <Preview src={setup?.preview ?? undefined} name={setup?.name || setup?.id} to="/bikes" />
        <div className="grid grid-cols-4 gap-2 overflow-y-auto scroll h-[calc(100vh-140px)]">
          {bikes.map((bike, index) => (
            <Link key={index} to="/" onClick={() => selectBike(bike)} className="block">
              <Preview src={bike.preview || undefined} name={bike.name || bike.id} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}