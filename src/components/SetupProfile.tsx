import {
  faCarAlt,
  faCircleUser,
  faCouch,
  faHeadphones,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetupProfileFormValues } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { LocationInput, NumberInput, TagsInput, TextAreaInput, TextInput } from '@components/inputs'
import Button from './Button'

export default function SetupProfile() {
  const { data: session } = useSession()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm<SetupProfileFormValues>({
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
    if (!session) {
      alert('Looks like you are not logged in. Please try reloading the page.')
      return
    }

    const uid = session.user.id

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(uid, formData.picture[0])

    if (uploadError) {
      console.log(uploadError)
      alert('Something went wrong when uploading your image. Please try again later.')
      return
    }

    const { publicURL } = supabase.storage.from('profile-pictures').getPublicUrl(uid)

    if (formData.hasNoCar) {
      formData.carModel = undefined
      formData.carColor = undefined
      formData.availableSeats = undefined
    }

    const { data, error } = await supabase.from('users').insert({
      id: session.user.id,
      email: session.user.email,
      first_name: session.user.firstName,
      last_name: session.user.lastName,
      bio: formData.bio,
      picture_url: publicURL,
      interests: formData.interests?.map((interest) => interest.tag),
      music: formData.music,
      car_model: formData.carModel,
      available_seats: formData.availableSeats,
      car_color: formData.carColor,
      latitude: formData.latitude,
      longitude: formData.longitude,
      location: formData.location,
    })

    if (error || !data) {
      alert('Something went wrong. Please try again later.')
      return
    }

    router.replace('/')
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
            {...register('picture', {
              required:
                'Please upload a photo of yourself. We do this to ensure everybody feels safe on Rindr.',
            })}
          />
          <div className="absolute bottom-3 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-rose-500">
            <FontAwesomeIcon icon={faPlus} className="text-md text-white" />
          </div>
        </label>
        {errors.picture && <FormError message={errors.picture.message} />}
        <LocationInput register={register} setValue={setValue} />
        {errors.location && <FormError message={errors.location.message} />}

        <TextAreaInput placeholder="Tell us something about you" register={register} id="bio" />
        {errors.bio && <FormError message={errors.bio.message} />}

        <div>
          <h3 className="mb-3 text-left font-bold">My car</h3>
          <div className="flex flex-wrap items-start">
            <input type="checkbox" {...register('hasNoCar')} className="accent-rose-500" />
            <label>No car</label>
            <TextInput
              placeholder="Which car do you have?"
              register={register}
              name="carModel"
              tailwindBgClass="bg-rose-500"
              icon={<FontAwesomeIcon icon={faCarAlt} color="white" />}
              disabled={watch('hasNoCar')}
            />

            {/*<input type="number" {...register('availableSeats')} disabled={watch('hasNoCar')} /> */}
            <NumberInput
              placeholder="2"
              register={register}
              name="availableSeats"
              tailwindBgClass="bg-rose-500"
              icon={<FontAwesomeIcon icon={faCouch} color="white" />}
              disabled={watch('hasNoCar')}
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-left font-bold">Interests</h3>
          <TagsInput control={control} register={register} />

          <TextInput
            placeholder="What music do you listen to?"
            register={register}
            registerOptions={{
              required:
                'Please tell us about some music you listen to. We use it to match witch users which have similar interests.',
            }}
            name="music"
            tailwindBgClass="bg-rose-500"
            icon={<FontAwesomeIcon icon={faHeadphones} color="white" />}
            disabled={watch('hasNoCar')}
          />
          {errors.music && <FormError message={errors.music.message} />}
        </div>

        <Button buttonType="submit" text="Done" bgColor="bg-rose-700" textColor="text-white" />
      </form>
    </div>
  )
}

function FormError({ message }: { message?: string }) {
  return (
    <p className="px-5 py-3 -mt-4 rounded-md border-l-4 border-l-red-700 bg-red-100 text-sm">
      {message || 'Something went wrong. Please try again later.'}
    </p>
  )
}
