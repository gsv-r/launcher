import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="z-10 px-4 mb-6 flex items-center gap-6 text-4xl tracking-wider lowercase">
      {/* <p className="no-drag text-neutral-500 cursor-pointer">race</p> */}
      <Link to="/" className="no-drag text-neutral-400 cursor-pointer">
        practice
      </Link>
      {/* <p className="no-drag text-neutral-500 cursor-pointer">my bikes</p> */}
      <Link to="/profile" className="no-drag text-neutral-400 cursor-pointer">
        profile
      </Link>
    </nav>
  )
}