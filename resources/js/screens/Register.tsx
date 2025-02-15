import React, { ReactElement, useState } from 'react'
import Screen from '../components/Screen'
import Form from '../components/Form'
import Lang from '../services/Lang'
import { useAuthStore } from '../stores/auth'
import User from '../types/User'

function Register(): ReactElement {
  const { register } = useAuthStore()

  return (
    <Screen
      contentClassName="flex items-center justify-center h-screen"
      redirectIfAuthenticated={true}
    >
      <Form
        buttonTitle={Lang.get('register.fields.submit')}
        onSubmit={(formData) => register(formData as User)}
        fields={[
          {
            title: Lang.get('register.fields.name'),
            name: 'name',
            type: 'text'
          },
          {
            title: Lang.get('register.fields.email'),
            name: 'email',
            type: 'email'
          },
          {
            title: Lang.get('register.fields.password'),
            name: 'password',
            type: 'password'
          },
          {
            title: Lang.get('register.fields.password.confirmation'),
            name: 'password_confirmation',
            type: 'password'
          }
        ]}
      />
    </Screen>
  )
}

export default Register
