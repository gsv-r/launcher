import { Link } from 'react-router-dom'

type PreviewProps = {
  src?: string
  cover?: boolean
  name?: string | number
  to?: string
}

function toLocalFileUrl(filePath: string): string {
  return `local-file:///${encodeURI(filePath.replace(/\\/g, '/'))}`
}

export default function Preview({ src, cover = false, name, to = '/' }: PreviewProps) {
  const preview = src ? toLocalFileUrl(src) : undefined

  return (
    <Link
      to={to}
      className="relative w-full aspect-[4/3] bg-neutral-900 flex items-center justify-center overflow-hidden"
    >
      {preview ? (
        <img src={preview} className={`w-full h-full ${cover ? 'object-cover' : 'object-contain'}`} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-neutral-500">no preview</p>
        </div>
      )}
      <p className="w-full absolute bottom-0 p-2 bg-black/20 text-neutral-400 tracking-wide uppercase">
        {name}
      </p>
    </Link>
  )
}