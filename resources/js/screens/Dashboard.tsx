import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import { useAuthStore } from '../stores/auth'

function Dashboard(): ReactElement {
  const { logout } = useAuthStore()
  return (
    <Screen title={Lang.get('dashboard.title')} redirectIfGuest={true}>
      <div>Dashboard</div>
      <button onClick={logout}>Logout</button>
    </Screen>
  )
}

export default Dashboard
