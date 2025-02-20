import React, { ReactElement } from 'react'
import Screen from '../components/Screen'
import Lang from '../services/Lang'
import EditableTable from '../components/EditableTable'

function Members(): ReactElement {
  return (
    <Screen
      title={Lang.get('members.title')}
      contentClassName="p-3"
      redirectIfGuest={true}
      showAside={true}
    >
      <EditableTable<{ a: string; b: number }>
        title="Socios"
        editable={true}
        onCreate={Promise.resolve}
        onUpdate={Promise.resolve}
        onDelete={Promise.resolve}
        columns={[
          { title: 'Nombre', key: 'a' },
          { title: 'Edad', key: 'b' }
        ]}
        data={[
          { a: 'Juan', b: 52 },
          { a: 'Antonio', b: 12 },
          { a: 'Pedro', b: 25 },
          { a: 'María', b: 32 }
        ]}
      />
    </Screen>
  )
}

export default Members
