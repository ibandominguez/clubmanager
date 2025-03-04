import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'

function Dashboard(): ReactElement {
  return (
    <Screen
      title={Lang.get('dashboard.title')}
      contentClassName="p-3"
      redirectIfGuest={true}
      showAside={true}
    >
      Lorem ipsum ...
    </Screen>
  )
}

export default Dashboard
