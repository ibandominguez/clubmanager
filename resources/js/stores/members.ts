import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import type { Member } from '../types.d'
import Lang from '../services/Lang'

export interface MembersState {
  members: Member[]
  fetchMembers: () => Promise<void>
}

export const useMembersStore = create<MembersState>((set) => ({
  members: [],

  fetchMembers: async () => {
    toast.loading(Lang.get('members.fetching'), { id: 'fetchingMembers' })
    try {
      const response = await axios.get<Member[]>('/api/members', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      set({ members: response.data })
      toast.success(Lang.get('members.fetched'), { id: 'fetchingMembers' })
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`)
    }
  }
}))
