import React, { ReactElement } from 'react'
import { Link } from 'react-router'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import { useAuthStore } from '../stores/auth'
import Form from '../components/Form'

function Login(): ReactElement {
  const { login } = useAuthStore()

  const handleSubmit = async (formData: Record<string, any>) => {
    await login({ email: formData.email, password: formData.password })
  }

  return (
    <Screen
      contentClassName="flex flex-col items-center justify-center h-screen"
      redirectIfAuthenticated={true}
    >
      <img className="w-24" src="/images/logo.png" />
      <Form<{ email: string; password: string }>
        className="p-3 bg-gray-100 rounded-md my-3"
        buttonIcon="login"
        buttonTitle={Lang.get('login.fields.submit', { ucfirst: true })}
        onSubmit={handleSubmit}
        fields={[
          {
            label: Lang.get('login.fields.email', { ucfirst: true }),
            name: 'email',
            placeholder: Lang.get('login.fields.email.placeholder', {
              ucfirst: true
            }),
            type: 'email'
          },
          {
            label: Lang.get('login.fields.password', { ucfirst: true }),
            name: 'password',
            placeholder: Lang.get('login.fields.email.placeholder', {
              ucfirst: true
            }),
            type: 'password'
          }
        ]}
      />
      <Link to="/register" className="block underline text-sm">
        {Lang.get('home.register.link', { ucfirst: true })}
      </Link>
    </Screen>
  )
}

export default Login
