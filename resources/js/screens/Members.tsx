import React, { ReactElement } from 'react'
import moment from 'moment'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import EditableTable from '../components/EditableTable'
import { Member } from '../types.d'
import { useMembersStore } from '../stores/members'

function Members(): ReactElement {
  const { members, fetchMembers, createMember, updateMember, deleteMember } =
    useMembersStore()

  return (
    <Screen
      title={Lang.get('members.title')}
      contentClassName="p-8"
      redirectIfGuest={true}
      showAside={true}
      onMount={fetchMembers}
    >
      <EditableTable<Member>
        title={Lang.get('members.title')}
        editable={true}
        initialSortingKey="id"
        onCreate={createMember}
        onUpdate={updateMember}
        onDelete={deleteMember}
        data={members}
        fields={[
          { label: 'Id', name: 'id', editable: false },
          {
            label: 'Número socio',
            name: 'uid',
            type: 'number',
            listable: false
          },
          {
            label: 'Foto',
            name: 'photo_url',
            sortable: false,
            editable: false,
            render: (item: Member) => (
              <img
                className="rounded-full"
                src={`https://ui-avatars.com/api/?name=${item.name.split(' ').join('+')}&size=60`}
              />
            )
          },
          { label: 'Nombre', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          {
            label: 'Fecha de nacimiento',
            name: 'dob',
            type: 'date',
            render: (item: Member) => moment(item.dob).format('DD/MM/YYYY')
          },
          {
            label: 'Registro',
            name: 'registered_at',
            type: 'date',
            listable: false
          }
        ]}
      />
    </Screen>
  )
}

export default Members
