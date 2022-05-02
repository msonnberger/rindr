import { faCarAlt, faCircleUser, faHeadphones, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetupProfileFormValues } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { LocationInput, TagsInput, TextInput } from '@components/inputs'

export default function SetupProfile() {
  const { data: session } = useSession()
  const router = useRouter()

  const { register, handleSubmit, watch, control, setValue } = useForm<SetupProfileFormValues>({
    defaultValues: {
      interests: [],
    },
  })

  const watchPicture = watch('picture')
  let picturePreview = ''

  if (watchPicture && watchPicture[0]) {
    picturePreview = URL.createObjectURL(watchPicture[0])
  }

  const onSubmit: SubmitHandler<SetupProfileFormValues> = async (formData) => {
    if (!session) return

    const uid = session.user.id

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(uid, formData.picture[0])

    if (uploadError) throw uploadError

    const { publicURL } = supabase.storage.from('profile-pictures').getPublicUrl(uid)

    if (formData.hasNoCar) {
      formData.carModel = null
      formData.carColor = null
      formData.availableSeats = null
    }

    const { data, error } = await supabase.from('users').insert({
      id: session.user.id,
      email: session.user.email,
      first_name: session.user.firstName,
      last_name: session.user.lastName,
      bio: formData.bio,
      picture_url: publicURL,
      interests: formData.interests.map((interest) => interest.tag),
      music: formData.music,
      car_model: formData.carModel,
      available_seats: formData.availableSeats,
      car_color: formData.carColor,
      latitude: Number(formData.location.split(',')[1]),
      longitude: Number(formData.location.split(',')[0]),
    })

    if (error) console.error(error)
    if (data && !error) router.replace('/')
  }

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-4xl font-bold text-rose-500">
        Welcome, {session && session.user.firstName}!
      </h1>
      <h2 className="mt-3 text-lg">Please finish setting up your profile.</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-12 flex max-w-lg flex-col items-start gap-8"
      >
        <label className="relative cursor-pointer self-center" htmlFor="picture">
          {picturePreview ? (
            <img src={picturePreview} alt="Profile picture" className="h-48 w-48 rounded-full" />
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="text-[12rem] text-rose-200" />
          )}
          <input
            id="picture"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('picture')}
          />
          <div className="absolute bottom-3 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-rose-500">
            <FontAwesomeIcon icon={faPlus} className="text-md text-white" />
          </div>
        </label>
        <LocationInput register={register} setValue={setValue} />
        <textarea
          id="bio"
          placeholder="Tell us something about you"
          {...register('bio')}
        ></textarea>

        <div>
          <h3 className="mb-3 text-left font-bold">My car</h3>
          <div className="flex items-start">
            <TextInput
              placeholder="Which car do you have?"
              register={register}
              name="carModel"
              tailwindBgClass="bg-rose-500"
              icon={<FontAwesomeIcon icon={faCarAlt} color="white" />}
              disabled={watch('hasNoCar')}
            />
            <input type="checkbox" {...register('hasNoCar')} className="accent-rose-500" />
            <label>I don&apos;t have a car</label>
            <input type="color" {...register('carColor')} disabled={watch('hasNoCar')} />
            <input type="number" {...register('availableSeats')} disabled={watch('hasNoCar')} />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-left font-bold">Interests</h3>
          <TagsInput control={control} register={register} />
          <TextInput
            placeholder="What music do you listen to?"
            register={register}
            name="music"
            tailwindBgClass="bg-rose-500"
            icon={<FontAwesomeIcon icon={faHeadphones} color="white" />}
            disabled={watch('hasNoCar')}
          />
        </div>
        <input
          className="cursor-pointer rounded-lg bg-rose-500 py-2 px-3 text-white"
          type="submit"
          value="Done"
        />
      </form>
    </div>
  )
}
