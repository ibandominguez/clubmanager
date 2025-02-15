import React, { useState } from 'react'

export interface FormField {
  title: string
  name: string
  type:
    | 'file'
    | 'text'
    | 'email'
    | 'radio'
    | 'select'
    | 'number'
    | 'textarea'
    | 'password'
    | 'checkbox'
  options?: string[] // For select, checkbox, and radio
  value?: any // Initial value for the field
  attributes?: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > // Additional HTML attributes
}

export interface FormProps {
  fields: FormField[]
  buttonTitle: string
  onSubmit: (formData: Record<string, any>) => void
}

const Form: React.FC<FormProps> = ({ fields, buttonTitle, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce(
      (acc, field) => {
        acc[field.name] = field.value || (field.type === 'checkbox' ? [] : '')
        return acc
      },
      {} as Record<string, any>
    )
  )

  const handleChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={field.name}
          >
            {field.title}
          </label>

          {['text', 'email', 'password', 'number'].includes(field.type) && (
            <input
              type={field.type}
              id={field.name}
              value={formData[field.name]}
              onChange={(e) =>
                handleChange(
                  field.name,
                  field.type === 'number'
                    ? parseFloat(e.target.value)
                    : e.target.value
                )
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...field.attributes}
            />
          )}
          {field.type === 'textarea' && (
            <textarea
              id={field.name}
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
          {field.type === 'select' && field.options && (
            <select
              id={field.name}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {field.type === 'file' && (
            <input
              type="file"
              id={field.name}
              onChange={(e) => handleChange(field.name, e.target.files)}
              {...field.attributes}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          )}
          {field.type === 'checkbox' && field.options && (
            <div>
              {field.options.map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData[field.name]?.includes(option) || false}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...(formData[field.name] || []), option]
                        : (formData[field.name] || []).filter(
                            (item: string) => item !== option
                          )
                      handleChange(field.name, newValue)
                    }}
                    {...field.attributes}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          )}
          {field.type === 'radio' && field.options && (
            <div>
              {field.options.map((option) => (
                <label key={option} className="inline-flex items-center">
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="form-radio"
                  />
                  <span className="ml-2">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        {buttonTitle}
      </button>
    </form>
  )
}

export default Form
