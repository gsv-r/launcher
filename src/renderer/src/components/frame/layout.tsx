import NavBar from "./navbar";
import TitleBar from "./titlebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-neutral-950">
      <TitleBar />
      <NavBar />
      <div className="flex-1 relative z-10 px-4 pb-4 overflow-hidden">{children}</div>
    </div>
  )
}