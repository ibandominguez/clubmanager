import React, { ReactElement } from 'react'

export interface InputProps {
  name: string
  label?: string
  className?: string
  inputClassName?: string
  required?: boolean
  placeholder?: string
  type?: 'password' | 'text' | 'number' | 'select' | 'checkbox' | 'hidden'
  value?: string | number
  options?: { name: string; value: string | number }[]
  onChange: (value: string | number) => void
}

export default function Input(props: InputProps): ReactElement {
  const inputClassName =
    'p-2 rounded-md shadow-md bg-white w-full ' + props.inputClassName

  return (
    <div className={`p-1 ${props.className}`}>
      {props.label && (
        <label className="block w-full text-sm text-gray-500">
          {props.label}
        </label>
      )}
      {props.type === 'select' ? (
        <select
          name={props.name}
          value={props.value || ''}
          required={props.required}
          className={inputClassName}
          onChange={(event) => props.onChange(event.target.value)}
        >
          {Boolean(props.placeholder) && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {props.options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={props.name}
          value={props.value || ''}
          required={props.required}
          placeholder={props.placeholder}
          type={props.type}
          className={inputClassName}
          onChange={(event) => props.onChange(event.target.value)}
        />
      )}
    </div>
  )
}
