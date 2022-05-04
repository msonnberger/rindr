import {
  faCarAlt,
  faCircleUser,
  faCouch,
  faHeadphones,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SetupProfileFormValues } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import Button from '@components/Button'
import Layout from '@components/Layout'
import { LocationInput, NumberInput, TagsInput, TextAreaInput, TextInput } from '@components/inputs'

const Profile: NextPage = () => {
  const { data: session } = useSession()

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

  useEffect(() => {
    if (session) {
      // If someone knows a better syntax, please tell me
      setValue('location', session.user.location)
      setValue('longitude', session.user.longitude)
      setValue('latitude', session.user.latitude)
      setValue('bio', session.user.bio)
      setValue('hasNoCar', Boolean(session.user.carModel))
      setValue('carModel', session.user.carModel)
      setValue('carColor', session.user.carModel)
      setValue('availableSeats', session.user.availableSeats)
      setValue(
        'interests',
        session.user.interests.map((tag) => ({ tag: tag }))
      )
      setValue('music', session.user.music)
    }
  }, [session])

  const watchPicture = watch('picture')
  let picturePreview = session?.user.pictureUrl || ''

  if (watchPicture && watchPicture[0]) {
    picturePreview = URL.createObjectURL(watchPicture[0])
  }

  const onSubmit: SubmitHandler<SetupProfileFormValues> = async (formData) => {
    if (!session) {
      alert('Looks like you are not logged in. Please try reloading the page.')
      return
    }

    const uid = session.user.id

    if (Array.isArray(formData.picture) && formData.picture.length) {
      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(uid, formData.picture[0])

      if (uploadError) {
        console.error(uploadError)
        alert('Something went wrong when uploading your image. Please try again later.')
        return
      }
    }

    const { publicURL } = supabase.storage.from('profile-pictures').getPublicUrl(uid)

    if (formData.hasNoCar) {
      formData.carModel = undefined
      formData.carColor = undefined
      formData.availableSeats = undefined
    }

    const { data, error } = await supabase
      .from('users')
      .update({
        bio: formData.bio,
        picture_url: publicURL,
        interests: formData.interests?.map((interest) => interest.tag),
        music: formData.music,
        car_model: formData.carModel,
        available_seats: formData.availableSeats,
        car_color: formData.carColor,
        latitude: formData.latitude ?? session.user.latitude,
        longitude: formData.longitude ?? session.user.longitude,
        location: formData.location,
      })
      .match({ id: session.user.id })

    if (error || !data) {
      console.log(error)

      alert('Something went wrong. Please try again later.')
      return
    }
  }

  const [hasCar, setHasCar] = useState(true)

  const changeCarYes = () => {
    setHasCar(true)
  }

  const changeCarNo = () => {
    setHasCar(false)
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="flex flex-col items-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 flex max-w-lg flex-col items-start gap-8 w-full"
          >
            <label className="relative cursor-pointer self-center" htmlFor="picture">
              {picturePreview ? (
                <img
                  src={picturePreview}
                  alt="Profile picture"
                  className="h-48 w-48 rounded-full"
                />
              ) : (
                <FontAwesomeIcon icon={faCircleUser} className="text-[12rem] text-rose-200" />
              )}

              <input id="picture" type="file" accept="image/*" className="hidden" />
              <div className="absolute bottom-3 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-rose-500">
                <FontAwesomeIcon icon={faPlus} className="text-md text-white" />
              </div>
            </label>
            {errors.picture && <FormError message={errors.picture.message} />}

            <p className="flex justify-center font-bold w-full">
              {session && session.user.firstName} {session && session.user.lastName}
            </p>

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
                  onClick={changeCarYes}
                />
                <Button
                  buttonType="button"
                  text="no"
                  bgColor={`${hasCar ? 'bg-rose-300' : 'bg-rose-700'}`}
                  textColor="text-white"
                  fontWeight="semibold"
                  onClick={changeCarNo}
                />
              </div>
            </div>

            {hasCar && (
              <div>
                <h3 className="mb-3 text-left font-bold">My car</h3>
                <div className="flex flex-wrap items-start gap-x-2">
                  <TextInput
                    placeholder="Which car do you have?"
                    register={register}
                    name="carModel"
                    tailwindBgClass="bg-rose-500"
                    icon={<FontAwesomeIcon icon={faCarAlt} color="white" />}
                    disabled={watch('hasNoCar')}
                  />

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
            )}

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

            <Button
              buttonType="submit"
              text="save profile"
              bgColor="bg-rose-700"
              textColor="text-white"
              fontWeight="semibold"
            />
          </form>
        </div>
      </Layout>
    </>
  )
}

const FormError = ({ message }: { message?: string }) => (
  <p className="px-5 py-3 -mt-4 rounded-md border-l-4 border-l-red-700 bg-red-100 text-sm">
    {message || 'Something went wrong. Please try again later.'}
  </p>
)

export default Profile
