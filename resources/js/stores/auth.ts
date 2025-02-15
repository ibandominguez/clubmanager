import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import type User from '../types/User'
import Lang from '../services/Lang'

export interface AuthState {
  auth: User | null
  token: string | null
  register: (user: User) => Promise<void>
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => Promise<void>
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  auth: null,
  token: localStorage.getItem('token') || null,

  register: async (user: User) => {
    try {
      const response = await axios.post('/api/users', user)
      toast.success(Lang.get('register.success'))
      window.location.href = '/login'
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`)
    }
  },

  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post('/api/tokens', {
        email,
        password
      })
      localStorage.setItem('token', response.data.token)
      set({ auth: response.data, token: response.data.token })
      window.location.href = '/dashboard'
    } catch (error) {
      toast.error(Lang.get('login.error'))
    }
  },

  logout: async () => {
    set({ auth: null, token: null })
    localStorage.removeItem('token')
    window.location.href = '/login'
  },

  fetchUser: async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      set({ auth: response.data })
    } catch (error) {
      toast.error(
        `${Lang.get('auth.fetch.error')}: ${error.response.data.message}`
      )
    }
  }
}))
