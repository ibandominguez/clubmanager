import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Lang from '../services/Lang'

interface AuthState {
  user: any
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,

  login: async (email, password) => {
    try {
      const response = await axios.post('/api/login', {
        email,
        password
      })

      localStorage.setItem('token', response.data.token)
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`

      set({ user: response.data.user, token: response.data.token })
    } catch (error) {
      toast.error(Lang.get('auth.error'))
    }
  },

  logout: async () => {
    try {
      await axios.post('/api/logout', null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']

      set({ user: null, token: null })
    } catch (error) {
      toast.error(Lang.get('auth.error'))
    }
  },

  fetchUser: async () => {
    try {
      const response = await axios.get('/api/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      set({ user: response.data })
    } catch (error) {
      console.error('Fetching user failed', error)
    }
  }
}))
