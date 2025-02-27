import React, { ReactElement, useEffect, useState } from 'react'
import Input, { InputProps } from './Input'
import Button from './Button'
import moment from 'moment'

export type FormField<T> = Omit<InputProps, 'onChange' | 'name' | 'type'> & {
  name: keyof T
  type?:
    | 'text'
    | 'number'
    | 'date'
    | 'time'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'
    | 'color'
    | 'range'
    | 'checkbox'
    | 'radio'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'week'
    | 'datetime-local'
}

export interface FormProps<T> {
  fields: FormField<T>[]
  buttonTitle: string
  buttonIcon?: string
  className?: string
  inputWrapperClassName?: string
  onSubmit: (data: T) => void
}

export default function Form<T>({
  fields,
  buttonTitle,
  buttonIcon,
  className,
  inputWrapperClassName,
  onSubmit
}: FormProps<T>): ReactElement {
  const [data, setData] = useState<T>({} as T)

  const setDataKey = (key: keyof T, value: string | number | undefined) => {
    setData((data) => ({ ...data, [key]: value }))
  }

  useEffect(() => {
    fields.forEach((field) => {
      let finalValue = field.value
      if (field.type === 'date') {
        finalValue = moment(field.value).format('YYYY-MM-DD')
      }
      setDataKey(field.name, finalValue)
    })
  }, [fields])

  return (
    <form
      className={className}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(data)
      }}
    >
      <div className={inputWrapperClassName}>
        {fields.map((field, index) => (
          <Input
            key={index}
            className="text-sm"
            {...field}
            name={field.name as string}
            value={data[field.name] as string | number | undefined}
            onChange={(value) =>
              setDataKey(
                field.name,
                field.type === 'number' ? parseFloat(value as string) : value
              )
            }
          />
        ))}
      </div>
      <Button
        className="bg-blue-500 mt-2 w-full flex items-center justify-center"
        icon={buttonIcon}
        type="submit"
        title={buttonTitle}
      />
    </form>
  )
}
