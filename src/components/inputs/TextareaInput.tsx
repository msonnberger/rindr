import { UseFormRegister } from 'react-hook-form'

interface TextInputProps {
  placeholder: string
  id: string
  register: UseFormRegister<any>
}

export default function TextareaInput({ placeholder, id, register }: TextInputProps) {
  return (
    <div className={`flex gap-4 rounded-3xl bg-slate-100 p-2 w-full h-32 `}>
      <textarea
        id={id}
        className="bg-slate-100 w-full h-full resize-none p-2 outline-none"
        placeholder={placeholder}
        {...register('bio', {
          required:
            'Please tell us a little bit about yourself, so that others know something about the person they share a ride with.',
        })}
      ></textarea>
    </div>
  )
}
