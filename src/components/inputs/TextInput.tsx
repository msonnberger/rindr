import React from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface TextInputProps {
  placeholder: string
  name: string
  icon?: React.ReactNode
  tailwindBgClass?: string
  register: UseFormRegister<any>
  registerOptions?: RegisterOptions
  disabled?: boolean
}

export default function TextInput({
  placeholder,
  icon,
  tailwindBgClass,
  name,
  register,
  registerOptions,
  disabled,
}: TextInputProps) {
  return (
    <div className={`flex gap-4 rounded-full bg-slate-100 p-2 pr-8 ${!icon && 'pl-5'}`}>
      {icon && (
        <div className={`${tailwindBgClass} grid h-8 w-8 place-items-center rounded-full`}>
          {icon}
        </div>
      )}
      <input
        type="text"
        disabled={disabled}
        id={name}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className="bg-inherit focus:outline-none"
      />
    </div>
  )
}
