import React, { useEffect, useMemo, useState, ReactElement } from 'react'
import { useNavigate, NavLink } from 'react-router'
import Lang from '../services/Lang'

interface ScreenProps {
  children: React.ReactNode
  title?: string
  showAside?: boolean
  onMount?: () => void
  onUnMount?: () => void
  style?: React.CSSProperties
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

const Screen: React.FC<ScreenProps> = ({
  children,
  title,
  showAside,
  onMount,
  onUnMount,
  style,
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
      return
    } else if (authToken && redirectIfAuthenticated) {
      navigate('/admin')
      return
    }
    if (onMount) {
      onMount()
    }
    if (onUnMount) {
      return () => {
        onUnMount()
      }
    }
  }, [authToken])

  if (
    (!authToken && redirectIfGuest) ||
    (authToken && redirectIfAuthenticated)
  ) {
    return null
  }

  return (
    <section className="flex h-screen" style={style}>
      {showAside && (
        <aside
          style={{ zIndex: 9999999 }}
          className={`absolute left-0 top-0 flex h-screen w-60 flex-shrink-0 flex-col overflow-y-hidden bg-gray-400 duration-300 ease-linear md:static md:translate-x-0 ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <section className="flex items-center justify-center text-white h-20 bg-gray-900 font-bold text-2xl">
            CLUBMANAGER
          </section>
          <nav className="p-3">
            <NavLinkItem
              to="/admin"
              icon="dashboard"
              title={Lang.get('dashboard.title')}
            />
            <NavLinkItem
              to="/admin/members"
              icon="group"
              title={Lang.get('members.title')}
            />
          </nav>
          <NavLink
            to="/"
            onClick={() => window.localStorage.removeItem('token')}
            className="mt-auto bg-gray-800 p-3 flex justify-center items-center text-gray-300"
          >
            <span className="material-symbols-outlined text-xs mr-3">
              logout
            </span>
            <span className="text-sm">{Lang.get('logout.title')}</span>
          </NavLink>
        </aside>
      )}
      <main className="w-full h-full overflow-y-scroll">
        {title && (
          <h2 className="text-2xl p-4 font-bold h-20 flex items-center bg-gray-200 fixed z-50 w-full">
            {title}
            <span
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="cursor-pointer material-symbols-outlined ml-auto md:hidden"
            >
              menu
            </span>
          </h2>
        )}
        <section
          className={`!relative ${contentClassName} ${title ? '!mt-20' : ''}`}
        >
          {children}
        </section>
      </main>
    </section>
  )
}

export default Screen
