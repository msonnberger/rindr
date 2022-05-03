import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { Campuses } from 'src/types/main'
import { SwiperCard } from './SwiperCard'

interface SwiperContainerProps {
  setOpenFilter: any
}
export const SwiperContainer = ({ setOpenFilter }: SwiperContainerProps) => {
  const [newRequests, setNewRequests] = useState(1)
  const [swipeRight, setSwipeRight] = useState('test')
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

  //TODO: get all filtered Rides and show them as a swiper-tindercard and commit the proper user object

  const onSwipe = (direction: string, index: number) => {
    console.log('You swiped: ' + direction)
    if (direction === 'right') {
      //debugger
      setNewRequests(2)
      //setNewRequests([index, ...newRequests])
      setSwipeRight('hallo')
      console.log('RIGHT', index)
    }
  }

  const onCardLeftScreen = (myIdentifier: string) => {
    console.log(myIdentifier + ' left the screen')
    console.log(newRequests, 'state')
    console.log(swipeRight, 'swipeRight')
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
      <div className="relative flex justify-center mt-4">
        {[swiperCard, swiperCard].map((card, key) => {
          return (
            <TinderCard
              key={key}
              className="absolute z-0"
              onSwipe={(dir) => onSwipe(dir, key)}
              onCardLeftScreen={() => onCardLeftScreen('1')}
              preventSwipe={['up', 'down']}
            >
              <SwiperCard user={card.user} ride={card.ride} />
            </TinderCard>
          )
        })}
      </div>
    </>
  )
}
