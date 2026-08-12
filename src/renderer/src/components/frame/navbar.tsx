export default function NavBar() {
  return (
    <nav className="z-10 px-4 py-2 mb-2 flex items-center gap-6 text-3xl uppercase text-neutral-500 tracking-wider lowercase">
      <p className="no-drag text-neutral-500 cursor-pointer">race</p>
      <p className="no-drag text-neutral-100 cursor-pointer">practice</p>
      <p className="no-drag text-neutral-500 cursor-pointer">my bikes</p>
      <p className="no-drag text-neutral-500 cursor-pointer">profile</p>
    </nav>
  )
}