interface RideFilterInputProps {
  type: 'date' | 'destination'
  name: string
  setInput: any
  label: string
}
export default function ErrorMessage({ type, name, setInput, label }: RideFilterInputProps) {
  return (
    <>
      {type == 'destination' && (
        <label htmlFor={name} className="mt-5">
          <p className="font-light mt-6 mb-2">{label}</p>
          <input
            className="bg-slate-50 w-full flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="text"
            name={name}
            onChange={(ev) => setInput(ev.target.value)}
          />
        </label>
      )}
      {type == 'date' && (
        <label htmlFor={name} className="mt-5">
          <p className="font-light mt-6 mb-2">{label}</p>
          <input
            className="bg-slate-50 flex gap-4 rounded-full bg-slate-100 p-3 focus:outline-none text-slate-600 font-light"
            type="date"
            name={name}
            onChange={(ev) => setInput(ev.target.value)}
          />
        </label>
      )}
    </>
  )
}
