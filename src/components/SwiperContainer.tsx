//inspired by: https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { Fragment, createRef, useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { FindRideResponse } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { SwiperCard } from '@components/SwiperCard'

interface SwiperContainerProps {
  swiperCards: FindRideResponse[]
  setOpenFilter: any
  setOpenedProfile: any
}

export const SwiperContainer = ({
  swiperCards,
  setOpenFilter,
  setOpenedProfile,
}: SwiperContainerProps) => {
  const [currentIndex, setCurrentIndex] = useState(swiperCards.length - 1)
  const currentIndexRef = useRef(currentIndex)
  const { data: session } = useSession()

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

  const onSwipe = (direction: string, index: number) => {
    updateCurrentIndex(index - 1)
    if (direction === 'right') {
      sendRideRequest(index)
    }
    if (direction === 'up') {
      const current = swiperCards[currentIndex].driver
      if (swiperCards[currentIndex].driver) {
        setOpenedProfile({
          firstName: current.first_name,
          lastName: current.last_name,
          department: current?.department,
          thumbsUpCount: current?.thumbs_up_count,
          thumbsDownCount: current?.thumbs_down_count,
          pictureUrl: current?.picture_url,
          bio: current?.bio,
          interests: current?.interests,
          music: current?.music,
          mapUrl: swiperCards[currentIndex].ride.image_url,
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
    // @ts-ignore
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
  }

  return (
    <div className="relative top-0">
      <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 -top-16"
        onClick={() => setOpenFilter(true)}
      >
        <FontAwesomeIcon icon={faRoute} size="lg" />
        <p className="ml-3 font-bold">Filter</p>
      </button>
      <div className="flex justify-center mt-8">
        {currentIndexRef.current == -1 && (
          <p className="text-sky-400 mt-14 text-lg">No Rides left...</p>
        )}
        {swiperCards.map((card, key) => {
          return (
            <Fragment key={card.ride.id}>
              {card.driver && (
                <TinderCard
                  // @ts-ignore
                  ref={childRefs[key]}
                  className="absolute z-0"
                  onSwipe={(dir) => onSwipe(dir, key)}
                  onCardLeftScreen={() => outOfFrame(card.driver?.first_name, key)}
                  preventSwipe={['down']}
                >
                  <SwiperCard driver={card.driver} ride={card.ride} swipe={swipe} />
                </TinderCard>
              )}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
