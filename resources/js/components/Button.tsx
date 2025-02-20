import React, { ReactElement } from 'react'

export interface ButtonProps {
  title?: string
  className?: string
  type?: 'submit'
  icon?: string
  xsAdaptable?: boolean
  onClick?: () => void
}

export default function Button(props: ButtonProps): ReactElement {
  const className = `cursor-pointer font-bold flex items-center p-2 sm:px-3 text-white rounded-md shadow-md ${props.className} `
  return (
    <button onClick={props.onClick} className={className}>
      {props.icon && (
        <span className="material-symbols-outlined">{props.icon}</span>
      )}
      {props.title && (
        <span
          className={`${props.xsAdaptable ? 'hidden sm:block' : ''} ${props.icon ? 'ml-2' : ''}`}
        >
          {props.title}
        </span>
      )}
    </button>
  )
}
