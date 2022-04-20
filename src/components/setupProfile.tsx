import { useForm, SubmitHandler } from 'react-hook-form'

interface Inputs {
  picture: FileList
  location: string
  bio: string
  carModel: string
  carColor: string
  availableSeats: number
  interests: string[]
  music: string
}

export default function SetupProfile() {
  const { register, handleSubmit, watch } = useForm<Inputs>()
  const watchPicture = watch('picture')
  let picturePreview

  if (watchPicture) {
    picturePreview = URL.createObjectURL(watchPicture[0])
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="flex flex-col items-start">
      <h1 className="text-4xl font-bold text-rose-500">Welcome, Martin!</h1>
      <h2 className="mt-3 text-lg">Please finish setting up your profile.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
        <img src={picturePreview} alt="Profile picture" className="h-48 w-48 rounded-full" />
        <input id="picture" type="file" className="hidden" {...register('picture')} />
        <label htmlFor="picture">Upload Photo</label>

        <input type="text" id="location" placeholder="Where do you commute from?" {...register('location')} />
        <input type="textarea" id="bio" placeholder="Tell us something about you" {...register('bio')} />

        <div>
          <h3 className="font-bold">My car</h3>
          <input type="text" placeholder="Ford Mustang" {...register('carModel')} />
          <input type="color" {...register('carColor')} />
          <input type="number" {...register('availableSeats')} />
        </div>

        <div>
          <h3 className="font-bold">Interests</h3>
          <input type="text" placeholder="new tag" {...register('interests')} />
        </div>
        <input type="submit" value="Done" />
      </form>
    </div>
  )
}
