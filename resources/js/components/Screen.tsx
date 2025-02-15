import React, { useEffect, useMemo, useState, ReactElement } from 'react'
import { useNavigate, NavLink } from 'react-router'
import Lang from '../services/Lang'

interface ScreenProps {
  children: React.ReactNode
  title?: string
  showAside?: boolean
  contentClassName?: string
  redirectIfGuest?: boolean
  redirectIfAuthenticated?: boolean
}

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
        `p-3 hover:bg-gray-200 hover:text-white border-b-2 border-white flex items-center ${isActive ? 'bg-gray-300' : ''}`
      }
    >
      {icon && <span className="material-symbols-outlined mr-3">{icon}</span>}
      <span className="text-md">{title}</span>
    </NavLink>
  )
}

const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  showAside,
  contentClassName,
  redirectIfGuest,
  redirectIfAuthenticated
}) => {
  const navigate = useNavigate()
  const authToken = useMemo(() => localStorage.getItem('token'), [])
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  useEffect(() => {
    if (title) document.title = title
    if (!authToken && redirectIfGuest) {
      navigate('/login')
    } else if (authToken && redirectIfAuthenticated) {
      navigate('/admin')
    }
  }, [authToken])

  if (
    (!authToken && redirectIfGuest) ||
    (authToken && redirectIfAuthenticated)
  ) {
    return null
  }

  return (
    <section className="flex">
      {showAside && (
        <aside
          className={`absolute left-0 top-0 z-9999 flex h-screen w-80 flex-shrink-0 flex-col overflow-y-hidden bg-gray-500 duration-300 ease-linear md:static md:translate-x-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <section className="flex items-center justify-center text-white h-20 bg-gray-900 font-bold text-2xl">
            LOGO
          </section>
          <nav>
            <NavLinkItem
              to="/admin"
              icon="dashboard"
              title={Lang.get('dashboard.title')}
            />
            <NavLinkItem
              to="/admin/members"
              icon="home"
              title={Lang.get('members.title')}
            />
          </nav>
        </aside>
      )}
      <main className="w-full">
        {title && (
          <h2 className="text-2xl p-4 font-bold h-20 flex items-center bg-gray-200">
            {title}
            <span
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="cursor-pointer material-symbols-outlined ml-auto md:hidden"
            >
              menu
            </span>
          </h2>
        )}
        <section className={contentClassName}>{children}</section>
      </main>
    </section>
  )
}

export default Screen
