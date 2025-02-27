import React, { ReactElement } from 'react'
import { NavLink } from 'react-router'

export function NavLinkItem({
  to,
  icon,
  title
}: {
  to: string
  icon: string
  title: string
}): ReactElement {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `p-3 hover:bg-gray-600 hover:text-white hover:rounded-sm border-b-2 border-white flex items-center ${isActive ? 'bg-gray-500 text-gray-200' : ''}`
      }
    >
      {icon && (
        <span className="material-symbols-outlined text-xs mr-3">{icon}</span>
      )}
      <span className="text-sm">{title}</span>
    </NavLink>
  )
}
