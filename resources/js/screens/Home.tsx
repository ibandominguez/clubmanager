import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import { Link } from 'react-router'

function Home(): ReactElement {
  return (
    <Screen contentClassName="flex flex-col items-center justify-center min-h-screen">
      <h2 className="flex items-center justify-center text-white h-20 bg-gray-900 font-bold text-2xl p-3 rounded-md">
        CLUBMANAGER
      </h2>
      <Link to="/register" className="block underline">
        {Lang.get('home.register.link')}
      </Link>
      <Link to="/login" className="block underline">
        {Lang.get('home.login.link')}
      </Link>
    </Screen>
  )
}

export default Home
