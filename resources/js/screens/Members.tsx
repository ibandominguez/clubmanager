import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import EditableTable from '../components/EditableTable'
import { Member } from '../types.d'
import { useMembersStore } from '../stores/members'

function Members(): ReactElement {
  const { members, fetchMembers } = useMembersStore()

  return (
    <Screen
      title={Lang.get('members.title')}
      contentClassName="p-3"
      redirectIfGuest={true}
      showAside={true}
      onMount={fetchMembers}
    >
      <EditableTable<Member>
        title={Lang.get('members.title')}
        editable={true}
        initialSortingKey="id"
        onCreate={Promise.resolve}
        onUpdate={Promise.resolve}
        onDelete={Promise.resolve}
        data={members}
        columns={[
          { title: 'Código', key: 'id', sortable: true },
          { title: 'Nombre', key: 'name', sortable: true },
          { title: 'Registro', key: 'registered_at' }
        ]}
      />
    </Screen>
  )
}

export default Members
