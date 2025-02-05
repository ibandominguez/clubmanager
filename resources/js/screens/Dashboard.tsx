import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'

function Dashboard(): ReactElement {
  return (
    <Screen title={Lang.get('dashboard.title')} redirectIfGuest={true}>
      <div>Dashboard</div>
    </Screen>
  )
}

export default Dashboard
