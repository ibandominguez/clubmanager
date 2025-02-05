import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'

function Login(): ReactElement {
  return (
    <Screen title={Lang.get('login.title')} redirectIfAuthenticated={true}>
      <div>Login</div>
    </Screen>
  )
}

export default Login
