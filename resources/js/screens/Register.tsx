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
            label: Lang.get('register.fields.name'),
            placeholder: Lang.get('register.fields.name.placeholder'),
            name: 'name',
            type: 'text'
          },
          {
            label: Lang.get('register.fields.email'),
            placeholder: Lang.get('register.fields.email.placeholder'),
            name: 'email',
            type: 'email'
          },
          {
            label: Lang.get('register.fields.password'),
            placeholder: Lang.get('register.fields.password.placeholder'),
            name: 'password',
            type: 'password'
          },
          {
            label: Lang.get('register.fields.password.confirmation'),
            placeholder: Lang.get(
              'register.fields.password.confirmation.placeholder'
            ),
            name: 'password_confirmation',
            type: 'password'
          }
        ]}
      />
    </Screen>
  )
}

export default Register
