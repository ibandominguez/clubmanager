import React, { ReactElement } from 'react'
import { Link } from 'react-router'
import Screen from '../components/Screen'
import Form from '../components/Form'
import Lang from '../services/Lang'
import { useAuthStore } from '../stores/auth'
import { User } from '../types.d'

function Register(): ReactElement {
  const { register } = useAuthStore()

  const handleSubmit = (user: Partial<User>) => {
    register(user as User)
  }

  return (
    <Screen
      style={{
        backgroundImage: 'url(/images/famara-background.jpg)',
        backgroundSize: 'cover'
      }}
      contentClassName="flex flex-col items-center justify-center h-screen"
      redirectIfAuthenticated={true}
    >
      <img className="w-20" src="/images/logo.png" />
      <Form<Partial<User & { password: string; password_confirmation: string }>>
        className="p-3 bg-white bg-opacity-50 rounded-md"
        buttonIcon="add"
        buttonTitle={Lang.get('register.fields.submit', { ucfirst: true })}
        onSubmit={handleSubmit}
        fields={[
          {
            label: Lang.get('register.fields.name', { ucfirst: true }),
            placeholder: Lang.get('register.fields.name.placeholder', {
              ucfirst: true
            }),
            name: 'name',
            type: 'text'
          },
          {
            label: Lang.get('register.fields.email', { ucfirst: true }),
            placeholder: Lang.get('register.fields.email.placeholder', {
              ucfirst: true
            }),
            name: 'email',
            type: 'email'
          },
          {
            label: Lang.get('register.fields.password', { ucfirst: true }),
            placeholder: Lang.get('register.fields.password.placeholder', {
              ucfirst: true
            }),
            name: 'password',
            type: 'password'
          },
          {
            label: Lang.get('register.fields.password.confirmation', {
              ucfirst: true
            }),
            placeholder: Lang.get(
              'register.fields.password.confirmation.placeholder',
              { ucfirst: true }
            ),
            name: 'password_confirmation',
            type: 'password'
          }
        ]}
      />
      <Link to="/login" className="block underline text-sm">
        {Lang.get('home.login.link', { ucfirst: true })}
      </Link>
    </Screen>
  )
}

export default Register
