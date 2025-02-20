import React, { useState } from 'react'
import Form from '../components/Form'

export interface EditableTableFieldProps<T> {
  key: keyof T
  title: string
  render?: (item: T) => string
}

export interface EditableTableProps<T> {
  title?: string
  columns: EditableTableFieldProps<T>[]
  data: T[]
  editable?: boolean
  onCreate?: (item: T) => Promise<T>
  onUpdate?: (item: T) => Promise<T>
  onDelete?: (item: T) => Promise<T>
}

export default function EditableTable<T>({
  title,
  columns,
  data,
  editable,
  onCreate,
  onUpdate,
  onDelete
}: EditableTableProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const handleOnUpdate = async (item: T) => {
    setIsLoading(true)
    try {
      onUpdate && (await onUpdate(item))
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false)
    }
  }

  const handleOnDelete = async (item: T) => {
    setIsLoading(true)
    try {
      onDelete && (await onDelete(item))
    } catch (error) {
      // handle error
    } finally {
      setIsLoading(false)
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
              {column.title}
            </th>
          ))}
          {editable && (onUpdate || onDelete) && (
            <th scope="col" className="px-6 py-3 text-right">
              {' '}
            </th>
          )}
        </thead>
        <tbody>
          {data.map((item, index) => (
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
                      onClick={() => handleOnDelete(item)}
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
            className="flex flex-wrap"
            onSubmit={(item) => handleOnUpdate(item as T)}
            fields={columns.map((column) => ({
              label: column.title,
              name: column.key as keyof T,
              className: 'w-full',
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
