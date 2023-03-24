import React from 'react'

export default function NavigationBar() {
  return (
    <nav className="bg-white p-4">
      <ul className="flex justify-center m-auto space-x-4">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Sample page</a>
        </li>
      </ul>
    </nav>
  )
}
