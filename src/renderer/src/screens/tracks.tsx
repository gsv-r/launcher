import { useEffect, useState } from 'react'
import { Link } from 'react-router';

import Layout from "../components/frame/layout";
import Preview from "../components/practice/preview";

import { Track } from '../../../types/track'

export default function Tracks() {
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    window.api.getTracks()
      .then((result) => setTracks(result as Track[]))
      .catch((error) => console.error('Failed to fetch tracks:', error))
  }, [])

  function selectTrack(track: Track) {
    window.store.set('practice.track.track_id', track.id)
    window.store.set('setup.track', track)
  }

  return (
    <Layout>
      <div className="grid grid-cols-[24vw_24vw_24vw_24vw] gap-2 overflow-y-auto scroll h-[calc(100vh-140px)]">
        {tracks.map((track, index) => (
          <Link key={index} to="/" onClick={() => selectTrack(track)} className="block">
            <Preview src={track.preview || undefined} name={track.name || track.id} cover />
          </Link>
        ))}
      </div>
    </Layout>
  )
}