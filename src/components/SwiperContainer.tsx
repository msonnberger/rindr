//inspired by: https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { RefObject, createRef, useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Campuses } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { SwiperCard } from './SwiperCard'

interface SwiperContainerProps {
  setOpenFilter: any
  setOpenedProfile: any
}
export const SwiperContainer = ({ setOpenFilter, setOpenedProfile }: SwiperContainerProps) => {
  const { data: session } = useSession()

  const swiperCard = {
    user: session?.user,
    ride: {
      id: '518a1dae-a874-4d4c-a0a4-ffd4763fba29',
      driver_id: session?.user.id,
      passenger_id: '',
      start_latitude: session?.user.latitude,
      start_longitude: session?.user.longitude,
      start_location: 'home',
      destination_latitude: Campuses[0].latitude,
      destination_longitude: Campuses[0].longitude,
      destination_location: Campuses[0].name,
      departure: '2022-05-03T12:00:00Z',
      arrival: '2022-05-03T12:30:00Z',
      duration: 30,
    },
  }
  const [swiperCards] = useState([swiperCard])
  const [currentIndex, setCurrentIndex] = useState(swiperCards.length - 1)
  const currentIndexRef = useRef(currentIndex)

  async function sendRideRequest(index: number) {
    const ride: any = swiperCards[index].ride
    if (!session) {
      alert('Looks like you are not logged in. Please try reloading the page.')
      return
    }

    const { data, error } = await supabase.from('ride_requests').insert({
      ride_id: ride.id,
      passenger_id: session?.user.id,
      status: 'pending',
    })

    if (error || !data) {
      alert('Something went wrong. Please try again later.')
      return
    }
  }

  //TODO: get all filtered Rides and show them as a swiper-tindercard and commit the proper user object

  const onSwipe = (direction: string, index: number) => {
    updateCurrentIndex(index - 1)
    if (direction === 'right') {
      //TODO: API new RideRequest
      sendRideRequest(index)
      console.log('RIGHT', index)
    }
    if (direction === 'up') {
      console.log('UP', index)
      const current = swiperCards[currentIndex].user
      if (swiperCards[currentIndex].user) {
        console.log('USER')
        setOpenedProfile({
          firstName: current?.firstName,
          lastName: current?.lastName,
          department: current?.department,
          thumbsUpCount: current?.thumbsUpCount,
          thumbsDownCount: current?.thumbsDownCount,
          pictureUrl: current?.pictureUrl,
          bio: current?.bio,
          interests: current?.interests,
          music: current?.music,
        })
        setCurrentIndex(index)
      } else {
        setOpenedProfile(undefined)
      }
    }
  }

  const childRefs = useMemo(
    () =>
      Array(swiperCards.length)
        .fill(0)
        .map(() => createRef()),
    []
  )

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const canSwipe = currentIndex >= 0

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < swiperCards.length) {
      // @ts-ignore
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card
    }
  }

  const outOfFrame = (name: string | undefined, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // @ts-ignore
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    //TODO: Karte bleibt erhalten
  }

  return (
    <>
      <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 top-16"
        onClick={() => setOpenFilter(true)}
      >
        <FontAwesomeIcon icon={faRoute} size="lg" />
        <p className="ml-3 font-bold">Filter</p>
      </button>
      <div className="flex justify-center mt-8">
        {currentIndexRef.current == -1 && (
          <p className="text-sky-400 mt-14 text-lg">No Rides left...</p>
        )}
        {[swiperCard, swiperCard].map((card, key) => {
          return (
            <>
              {card.user && (
                <TinderCard
                  // @ts-ignore
                  ref={childRefs[key]}
                  key={key}
                  className="absolute z-0"
                  onSwipe={(dir) => onSwipe(dir, key)}
                  onCardLeftScreen={() => outOfFrame(card.user?.firstName, key)}
                  preventSwipe={['down']}
                >
                  <SwiperCard
                    setOpenedProfile={setOpenedProfile}
                    user={card.user}
                    ride={card.ride}
                    swipe={swipe}
                  />
                </TinderCard>
              )}
            </>
          )
        })}
      </div>
    </>
  )
}
