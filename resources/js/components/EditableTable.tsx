import React, { useMemo, useState } from 'react'
import Form from '../components/Form'

export interface EditableTableFieldProps<T> {
  key: keyof T
  title: string
  sortable?: boolean
  render?: (item: T) => string
}

export interface EditableTableProps<T> {
  title?: string
  columns: EditableTableFieldProps<T>[]
  itemId?: string
  data: T[]
  initialSortingKey: Extract<keyof T, string>
  editable?: boolean
  onCreate?: (item: T) => Promise<void>
  onUpdate?: (item: T) => Promise<void>
  onDelete?: (item: T) => Promise<void>
}

export default function EditableTable<T>({
  title,
  columns,
  itemId = 'id',
  data,
  initialSortingKey,
  editable,
  onCreate,
  onUpdate,
  onDelete
}: EditableTableProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [sortingKey, setSortingKey] = useState<string>(initialSortingKey)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const sortedData = useMemo(() => {
    const sorted = [...data].sort((a, b) => {
      const key = sortingKey.startsWith('-') ? sortingKey.slice(1) : sortingKey
      const order = sortingKey.startsWith('-') ? -1 : 1
      const aValue = a[key]
      const bValue = b[key]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order * (aValue - bValue)
      } else {
        return order * String(aValue).localeCompare(String(bValue))
      }
    })
    return sorted
  }, [data, sortingKey])

  const handleEditAction = async (item: T, type = 'create') => {
    setIsLoading(true)
    if (type === 'create' && onCreate) {
      await onCreate(item)
    } else if (type === 'update' && onUpdate) {
      await onUpdate(item)
    } else if (type === 'delete' && onDelete) {
      await onDelete(item)
    }
    setIsLoading(false)
  }

  const handleSetSort = (key: string) => {
    if (sortingKey === key) {
      setSortingKey(`-${key}`)
    } else if (sortingKey === `-${key}`) {
      setSortingKey(key)
    } else {
      setSortingKey(key)
    }
  }

  return (
    <section className="relative overflow-x-auto">
      <header className="flex items-center p-3">
        <h2 className="text-xl text-gray-900">{title || ''}</h2>
        {editable && onCreate && (
          <button
            className="ml-auto material-symbols-outlined"
            onClick={() => setSelectedItem({} as T)}
          >
            add
          </button>
        )}
      </header>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {columns.map((column: EditableTableFieldProps<T>) => (
            <th scope="col" className="px-6 py-3" key={column.key as string}>
              <span
                className="flex items-center cursor-pointer"
                onClick={() =>
                  column.sortable && handleSetSort(column.key as string)
                }
              >
                {(sortingKey === column.key ||
                  sortingKey === `-${column.key as string}`) && (
                  <span className="text-xs material-symbols-outlined mr-2">
                    {sortingKey[0] === '-' ? 'arrow_downward' : 'arrow_upward'}
                  </span>
                )}
                {column.title}
              </span>
            </th>
          ))}
          {editable && (onUpdate || onDelete) && (
            <th scope="col" className="px-6 py-3 text-right">
              {' '}
            </th>
          )}
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              {columns.map((column: EditableTableFieldProps<T>) => (
                <td key={column.key as string} className="px-6 py-3">
                  {column.render
                    ? column.render(item)
                    : (item[column.key] as string)}
                </td>
              ))}
              {editable && (onUpdate || onDelete) && (
                <td className="px-6 py-3 text-right">
                  {onUpdate && (
                    <button
                      className="material-symbols-outlined text-blue-500"
                      onClick={() => setSelectedItem(item)}
                    >
                      edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="ml-3 material-symbols-outlined text-red-500"
                      onClick={() => handleEditAction(item, 'delete')}
                    >
                      delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <section className="bg-white bg-opacity-95 absolute top-0 left-0 w-full h-full">
          <div className="text-right">
            <span
              className="p-3 cursor-pointer material-symbols-outlined"
              onClick={() => setSelectedItem(null)}
            >
              close
            </span>
          </div>
          <Form<T>
            buttonIcon="send"
            buttonTitle="Enviar"
            className="p-5"
            inputWrapperClassName="flex flex-wrap"
            onSubmit={(item) =>
              handleEditAction(item, item[itemId] ? 'update' : 'create')
            }
            fields={columns.map((column) => ({
              label: column.title,
              name: column.key as keyof T,
              className: 'w-full text-sm',
              type:
                typeof selectedItem[column.key] === 'number'
                  ? 'number'
                  : 'text',
              value: (selectedItem[column.key] || '') as string | number
            }))}
          />
        </section>
      )}
      {isLoading && (
        <section className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="material-symbols-outlined animate-spin">cycle</span>
        </section>
      )}
    </section>
  )
}
