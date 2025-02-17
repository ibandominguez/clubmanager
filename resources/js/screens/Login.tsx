import React, { ReactElement } from 'react'
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
      contentClassName="flex items-center justify-center h-screen"
      redirectIfAuthenticated={true}
    >
      <Form
        buttonTitle={Lang.get('login.fields.submit')}
        onSubmit={handleSubmit}
        fields={[
          {
            title: Lang.get('login.fields.email'),
            name: 'email',
            type: 'email'
          },
          {
            title: Lang.get('login.fields.password'),
            name: 'password',
            type: 'password'
          }
        ]}
      />
    </Screen>
  )
}

export default Login
