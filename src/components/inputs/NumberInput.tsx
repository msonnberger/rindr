import React from 'react'
import { UseFormRegister } from 'react-hook-form'

interface NumInputProps {
  placeholder: string
  name: string
  icon?: React.ReactNode
  tailwindBgClass?: string
  register: UseFormRegister<any>
  disabled?: boolean
}

export default function NumberInput({
  placeholder,
  icon,
  tailwindBgClass,
  name,
  register,
  disabled,
}: NumInputProps) {
  return (
    <div className={`flex w-40 gap-4 rounded-full bg-slate-100 p-2 ${!icon && 'pl-5'}`}>
      {icon && (
        <div className={`${tailwindBgClass} grid h-8 w-8 place-items-center rounded-full`}>
          {icon}
        </div>
      )}
      <input
        type="number"
        disabled={disabled}
        placeholder={placeholder}
        {...register(name)}
        className="w-2/5 bg-inherit text-center focus:outline-none"
      />
    </div>
  )
}
