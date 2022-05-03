//inspired by: https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js
import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { createRef, useMemo, useRef, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Campuses } from 'src/types/main'
import { SwiperCard } from './SwiperCard'

interface SwiperContainerProps {
  setOpenFilter: any
}
export const SwiperContainer = ({ setOpenFilter }: SwiperContainerProps) => {
  const { data: session } = useSession()

  const swiperCard = {
    user: session?.user,
    ride: {
      id: '1234',
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
  const [swiperCards, setSwiperCards] = useState([swiperCard, swiperCard])
  const [currentIndex, setCurrentIndex] = useState(swiperCards.length - 1)
  const currentIndexRef = useRef(currentIndex)

  //TODO: get all filtered Rides and show them as a swiper-tindercard and commit the proper user object

  const onSwipe = (direction: string, index: number) => {
    console.log('You swiped: ' + direction)
    updateCurrentIndex(index - 1)
    if (direction === 'right') {
      //setNewRequests([index, ...newRequests])
      //TODO: API new RideRequest
      console.log('RIGHT', index)
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
    console.log(childRefs, 'childRefs')
    console.log(dir, 'DIR')
    if (canSwipe && currentIndex < swiperCards.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  const outOfFrame = (name: string | undefined, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
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
      <div className="relative flex justify-center mt-8">
        {currentIndexRef.current == -1 && (
          <p className="text-sky-400 mt-14 text-lg">No Rides left...</p>
        )}
        {[swiperCard, swiperCard].map((card, key) => {
          return (
            <TinderCard
              ref={childRefs[key]}
              key={key}
              className="absolute z-0"
              onSwipe={(dir) => onSwipe(dir, key)}
              onCardLeftScreen={() => outOfFrame(card.user?.firstName, key)}
              preventSwipe={['up', 'down']}
            >
              <SwiperCard
                user={card.user}
                ride={card.ride}
                swipeRight={() => swipe('right')}
                swipeLeft={() => swipe('left')}
              />
            </TinderCard>
          )
        })}
      </div>
    </>
  )
}
