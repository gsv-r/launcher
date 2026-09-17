import { useEffect, useState } from 'react'
import Layout from "../components/frame/layout";
import { Bike } from '../../../types/bikes'

export default function Bikes() {
  const [bikes, setBikes] = useState<Bike[]>([])

  useEffect(() => {
    window.api.getBikes()
      .then((result) => setBikes(result as Bike[]))
      .catch((error) => console.error('Failed to fetch bikes:', error))
  }, [])

  function selectBike(bike: Bike) {
    window.store.set('practice.bike.bike_id', bike.id)
    // window.store.set('selected.bike', bike)
  }
  
  return (
    <Layout>
      <div className="flex flex-col gap-1 h-[calc(100vh-140px)]">
        <div className="grid grid-cols-4 gap-2 overflow-y-auto scroll">
          {bikes.map((bike, index) => (
            <div
              key={index}
              onClick={() => selectBike(bike)}
              className="p-2 bg-neutral-900 flex flex-col items-center cursor-pointer"
            >
              <p className="text-neutral-500">no preview</p>
              <p className="text-neutral-500 tracking-wide lowercase">{bike.id}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}