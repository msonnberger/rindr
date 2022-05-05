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
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetupProfileFormValues, SupabaseUser } from 'src/types/main'
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
    console.log(formData.carModel)

    const uid = session.user.id

    const { error: uploadError } = await supabase.storage
      .from('profile-pictures')
      .upload(uid, formData.picture[0])

    if (uploadError) {
      console.error(uploadError)
      alert('Something went wrong when uploading your image. Please try again later.')
      return
    }

    const { publicURL } = supabase.storage.from('profile-pictures').getPublicUrl(uid)

    if (!hasCar) {
      formData.carModel = undefined
      formData.availableSeats = undefined
    }

    const { data, error } = await supabase.from<SupabaseUser>('users').insert({
      id: session.user.id,
      email: session.user.email,
      first_name: session.user.firstName,
      last_name: session.user.lastName,
      department: session.user.department,
      bio: formData.bio,
      picture_url: publicURL as string,
      interests: formData.interests?.map((interest) => interest.tag),
      music: formData.music,
      car_model: formData.carModel,
      available_seats: formData.availableSeats,
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

  const [hasCar, setHasCar] = useState(true)

  const changeCar = () => {
    if (hasCar) setHasCar(false)
    else setHasCar(true)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-rose-500">
        Welcome, {session && session.user.firstName}!
      </h1>
      <h2 className="mt-3 text-lg">Please finish setting up your profile.</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex max-w-lg flex-col items-start gap-8 w-full"
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
          <h3 className="mb-3 text-left font-bold">Do you have a car?</h3>
          <div className="flex flex-row gap-4">
            <Button
              buttonType="button"
              text="yes"
              bgColor={`${hasCar ? 'bg-rose-700' : 'bg-rose-300'}`}
              textColor="text-white"
              fontWeight="semibold"
              onClick={changeCar}
            />
            <Button
              buttonType="button"
              text="no"
              bgColor={`${hasCar ? 'bg-rose-300' : 'bg-rose-700'}`}
              textColor="text-white"
              fontWeight="semibold"
              onClick={changeCar}
            />
          </div>
        </div>

        {hasCar && (
          <div>
            <h3 className="mb-3 text-left font-bold">My car</h3>
            <div className="flex flex-wrap items-start gap-3">
              <TextInput
                placeholder="Which car do you have?"
                register={register}
                name="carModel"
                tailwindBgClass="bg-rose-500"
                icon={<FontAwesomeIcon icon={faCarAlt} color="white" />}
              />
              <div className="relative">
                <NumberInput
                  placeholder="2"
                  register={register}
                  name="availableSeats"
                  tailwindBgClass="bg-rose-500"
                  icon={<FontAwesomeIcon icon={faCouch} color="white" />}
                />
                <p className="font-light absolute top-3 left-32">seats</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <h3 className="text-left font-bold">Interests</h3>
          <TagsInput control={control} register={register} />
          <h3 className="text-left font-bold">Music</h3>
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
          />
          {errors.music && <FormError message={errors.music.message} />}
        </div>
        <div className="w-full flex justify-center">
          <Button
            buttonType="submit"
            text="save profile"
            bgColor="bg-rose-700"
            textColor="text-white"
            fontWeight="semibold"
          />
        </div>
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
