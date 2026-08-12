import { ReactElement } from 'react'
import { VscChromeMinimize, VscChromeClose } from 'react-icons/vsc'

type Action = 'minimize' | 'close'

const WINDOW_CONTROLS: { action: Action; icon: ReactElement; danger?: boolean }[] = [
  { action: 'minimize', icon: <VscChromeMinimize size={12} /> },
  { action: 'close', icon: <VscChromeClose size={12} />, danger: true }
]

export default function TitleBar() {
  const handleControlClick = (action: Action) => {
    window.electron.ipcRenderer.send(action)
  }

  return (
    <div className="flex drag-region items-center justify-between relative z-10">
      <p className="text-neutral-500 text-xs capitalize ml-4">launcher</p>
      <div className="flex items-center no-drag">
        {WINDOW_CONTROLS.map(({ action, icon, danger }) => (
          <button
            key={action}
            onClick={() => handleControlClick(action)}
            className={`h-8 px-4 flex items-center text-white no-drag ${
              danger ? 'hover:bg-red-600' : 'hover:bg-neutral-800'
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  )
}