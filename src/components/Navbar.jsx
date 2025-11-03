import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar(){
  const loc = useLocation()
  const link = (to,text) => (
    <Link
      to={to}
      className={
        "px-3 py-1 rounded hover:underline " +
        (loc.pathname === to ? "text-blue-400 font-semibold" : "text-blue-200")
      }
    >
      {text}
    </Link>
  )

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-sm">🚀</span>
          </div>
          <div className="text-xl font-semibold">ReactDock</div>
        </div>

        <div className="flex items-center space-x-2">
          {link("/", "Home")}
          {link("/dashboard", "Dashboard")}
          {link("/about", "About")}
        </div>
      </div>
    </nav>
  )
}
