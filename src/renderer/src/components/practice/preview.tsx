import { Link } from 'react-router-dom'

type PreviewCardProps = {
  src?: string
  cover?: boolean
  name?: string
  to?: string
}

export default function Preview({ src, cover = false, name, to = '/' }: PreviewCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <Link to={to} className="relative shrink-0 w-[22vw] h-[25vh] bg-neutral-900 flex items-center justify-center overflow-hidden">
        {src ? (
          <img src={src} className={`w-full h-full ${cover ? 'object-cover' : 'object-contain'}`} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-neutral-500">no preview</p>
          </div>
        )}
        <p className="w-full absolute bottom-0 p-2 bg-black/20 text-center text-neutral-400 tracking-wide">{name}</p>
      </Link>
    </div>
  )
}