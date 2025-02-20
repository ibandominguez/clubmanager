import React, { ReactElement, useEffect, useState } from 'react'
import Input, { InputProps } from './Input'
import Button from './Button'

export type FormField<T> = Omit<InputProps, 'onChange' | 'name'> & {
  name: keyof T
}

export interface FormProps<T> {
  fields: FormField<T>[]
  buttonTitle: string
  buttonIcon?: string
  className?: string
  onSubmit: (data: T) => void
}

export default function Form<T>({
  fields,
  buttonTitle,
  buttonIcon,
  className,
  onSubmit
}: FormProps<T>): ReactElement {
  const [data, setData] = useState<T>({} as T)

  const setDataKey = (key: keyof T, value: string | number | undefined) => {
    setData((data) => ({ ...data, [key]: value }))
  }

  useEffect(() => {
    fields.forEach((field) => {
      setDataKey(field.name, field.value)
    })
  }, [fields])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(data)
      }}
    >
      <div className={className}>
        {fields.map((field, index) => (
          <Input
            key={index}
            {...field}
            name={field.name as string}
            value={data[field.name] as string | number | undefined}
            onChange={(value) => setDataKey(field.name, value)}
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
