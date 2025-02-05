import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'

function Home(): ReactElement {
  return (
    <Screen title={Lang.get('home.title')}>
      <div>{Lang.get('home.title')}</div>
    </Screen>
  )
}

export default Home
