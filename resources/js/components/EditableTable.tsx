import React, { ReactNode, useMemo, useState } from 'react'
import Form from '../components/Form'
import Input, { InputProps } from './Input'

export interface Field<T> extends Omit<InputProps, 'onChange'> {
  name: Extract<keyof T, string>
  label: string
  listable?: boolean
  sortable?: boolean
  editable?: boolean
  render?: (item: T) => ReactNode
}

export interface EditableTableProps<T> {
  title?: string
  searchPlaceholder?: string
  noResultsMessage?: string
  fields: Field<T>[]
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
  searchPlaceholder = 'Search ...',
  noResultsMessage = 'No results ...',
  fields,
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
  const [searchTerm, setSearchTerm] = useState<string>('')

  const formattedFields = useMemo(() => {
    return fields.map<Field<T>>((field: Field<T>) => ({
      ...field,
      listable: field.listable === undefined ? true : field.listable,
      editable: field.editable === undefined ? true : field.editable,
      sortable: field.sortable === undefined ? true : field.sortable
    }))
  }, [fields])

  const sortedData = useMemo(() => {
    return [...data]
      .filter(
        (item) =>
          !searchTerm ||
          (searchTerm &&
            JSON.stringify(item)
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        const key = sortingKey.startsWith('-')
          ? sortingKey.slice(1)
          : sortingKey
        const order = sortingKey.startsWith('-') ? -1 : 1
        const aValue = a[key]
        const bValue = b[key]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return order * (aValue - bValue)
        } else {
          return order * String(aValue).localeCompare(String(bValue))
        }
      })
  }, [data, sortingKey, searchTerm])

  const handleEditAction = async (item: T, type = 'create') => {
    setIsLoading(true)
    if (type === 'create' && onCreate) {
      await onCreate(item)
    } else if (type === 'update' && onUpdate) {
      await onUpdate(item)
    } else if (type === 'delete' && onDelete) {
      await onDelete(item)
    }
    selectedItem && setSelectedItem(item)
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
        <h2 className="text-xl text-gray-900 mr-auto">{title || ''}</h2>
        <Input
          name="search"
          type="search"
          value={searchTerm}
          placeholder={searchPlaceholder}
          onChange={(value) => setSearchTerm(value.toString())}
        />
        {editable && onCreate && (
          <button
            className="ml-3 material-symbols-outlined"
            onClick={() => setSelectedItem({} as T)}
          >
            add
          </button>
        )}
      </header>
      <table className="w-full min-h-screen text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {formattedFields
            .filter((field) => field.listable)
            .map((column: Field<T>) => (
              <th scope="col" className="px-6 py-3" key={column.name as string}>
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() =>
                    column.sortable && handleSetSort(column.name as string)
                  }
                >
                  {(sortingKey === column.name ||
                    sortingKey === `-${column.name as string}`) && (
                    <span className="text-xs material-symbols-outlined mr-2">
                      {sortingKey[0] === '-'
                        ? 'arrow_downward'
                        : 'arrow_upward'}
                    </span>
                  )}
                  {column.label}
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
          {!sortedData.length && (
            <tr>
              <td colSpan={formattedFields.length} className="text-center">
                {noResultsMessage}{' '}
              </td>
            </tr>
          )}
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              {formattedFields
                .filter((field) => field.listable)
                .map((column: Field<T>) => (
                  <td key={column.name as string} className="px-6 py-3">
                    {column.render
                      ? column.render(item)
                      : (item[column.name] as string)}
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
              handleEditAction(
                { ...selectedItem, ...item },
                item[itemId] || selectedItem[itemId] ? 'update' : 'create'
              )
            }
            fields={formattedFields
              .filter((field) => field.editable || field.name !== itemId)
              .map((field) => ({
                ...field,
                className: 'w-full text-sm',
                value: (selectedItem[field.name] || '') as string | number
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
