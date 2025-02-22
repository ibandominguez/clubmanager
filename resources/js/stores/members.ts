import { create } from 'zustand'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import type { Member } from '../types.d'
import Lang from '../services/Lang'

export interface MembersState {
  members: Member[]
  fetchMembers: () => Promise<void>
  createMember: (member: Partial<Member>) => Promise<void>
  updateMember: (member: Partial<Member>) => Promise<void>
  deleteMember: (Member: Partial<Member>) => Promise<void>
}

export const useMembersStore = create<MembersState>((set, get) => ({
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
  },

  createMember: async (member: Partial<Member>) => {
    toast.loading(Lang.get('members.creating'), { id: 'creatingMember' })
    try {
      const response = await axios.post<Member>('/api/members', member, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      set({
        members: get().members.map((member) => {
          return member.id === response.data.id ? response.data : member
        })
      })
      toast.success(Lang.get('members.created'), { id: 'creatingMember' })
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`, {
        id: 'creatingMember'
      })
    }
  },

  updateMember: async (member: Partial<Member>) => {
    toast.loading(Lang.get('members.updating'), { id: 'updatingMember' })
    try {
      const response = await axios.put<Member>(
        `/api/members/${member.id}`,
        member,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      set({
        members: get().members.map((member) => {
          return member.id === response.data.id ? response.data : member
        })
      })
      toast.success(Lang.get('members.updated'), { id: 'updatingMember' })
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`, {
        id: 'updatingMember'
      })
    }
  },

  deleteMember: async (member: Partial<Member>) => {
    const memberId = member.id
    toast.loading(Lang.get('members.deleting'), { id: 'deletingMember' })
    try {
      await axios.delete<void>(`/api/members/${member.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      set({
        members: get().members.filter((member) => {
          return member.id !== memberId
        })
      })
      toast.success(Lang.get('members.deleted'), { id: 'deletingMember' })
    } catch (error) {
      toast.error(`${error.response?.data?.message || error.message}`, {
        id: 'deletingMember'
      })
    }
  }
}))
