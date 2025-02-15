import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'

function Members(): ReactElement {
  return (
    <Screen
      title={Lang.get('members.title')}
      contentClassName="p-3"
      redirectIfGuest={true}
      showAside={true}
    >
      hello world ...
    </Screen>
  )
}

export default Members
