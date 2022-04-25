import { useForm, SubmitHandler } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faPlus, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { TextInput, TagsInput } from '@components/inputs'
import { SetupProfileFormValues } from '@utils/types'

export default function SetupProfile() {
  const { register, handleSubmit, watch, control } = useForm<SetupProfileFormValues>({
    defaultValues: {
      interests: [],
    },
  })

  const watchPicture = watch('picture')
  let picturePreview = ''

  if (watchPicture && watchPicture[0]) {
    picturePreview = URL.createObjectURL(watchPicture[0])
  }

  const onSubmit: SubmitHandler<SetupProfileFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-4xl font-bold text-rose-500">Welcome, Martin!</h1>
      <h2 className="mt-3 text-lg">Please finish setting up your profile.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-12 flex max-w-lg flex-col items-start gap-8">
        <label className="relative cursor-pointer self-center" htmlFor="picture">
          {picturePreview ? (
            <img src={picturePreview} alt="Profile picture" className="h-48 w-48 rounded-full" />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="text-[12rem] text-rose-200" />
          )}
          <input id="picture" type="file" accept="image/*" className="hidden" {...register('picture')} />
          <div className="absolute bottom-3 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-rose-500">
            <FontAwesomeIcon icon={faPlus} className="text-md text-white" />
          </div>
        </label>
        <TextInput
          register={register}
          name="location"
          tailwindBgClass="bg-rose-500"
          icon={<FontAwesomeIcon icon={faLocationDot} color="white" />}
          placeholder="Where do you commute from?"
        />
        <textarea id="bio" placeholder="Tell us something about you" {...register('bio')}></textarea>

        <div>
          <h3 className="font-bold">My car</h3>
          <input type="text" placeholder="Ford Mustang" {...register('carModel')} />
          <input type="color" {...register('carColor')} />
          <input type="number" {...register('availableSeats')} />
        </div>

        <div>
          <h3 className="mb-3 text-left font-bold">Interests</h3>
          <TagsInput control={control} register={register} />
        </div>
        <input type="submit" value="Done" />
      </form>
    </div>
  )
}
