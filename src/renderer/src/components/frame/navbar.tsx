import { useDispatch, useSelector } from 'react-redux'
import { setNavbarActive } from '../../redux/slices/launcherSlice'
import type { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>()
  const active = useSelector((state: RootState) => state.launcher.navbar.active)

  return (
    <nav className="z-10 px-4 mb-6 flex items-center gap-6 text-4xl tracking-wider lowercase">
      {/* <p className="no-drag text-neutral-500 cursor-pointer">race</p> */}
      <Link
        to="/"
        className={`no-drag cursor-pointer ${active === 'practice' ? 'text-white' : 'text-neutral-400'}`}
        onClick={() => dispatch(setNavbarActive('practice'))}
      >
        practice
      </Link>
      {/* <p className="no-drag text-neutral-500 cursor-pointer">my bikes</p> */}
      <Link
        to="/profile"
        className={`no-drag cursor-pointer ${active === 'profile' ? 'text-white' : 'text-neutral-400'}`}
        onClick={() => dispatch(setNavbarActive('profile'))}
      >
        profile
      </Link>
    </nav>
  )
}