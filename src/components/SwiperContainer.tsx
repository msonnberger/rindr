import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import { SwiperCard } from './SwiperCard'

interface SwiperContainerProps {
  setOpenFilter: any
}
export const SwiperContainer = ({ setOpenFilter }: SwiperContainerProps) => {
  const [newRequests, setNewRequests] = useState(1)
  const [swipeRight, setSwipeRight] = useState('test')

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
        <TinderCard
          className="absolute z-0"
          onSwipe={(dir) => onSwipe(dir, 1)}
          onCardLeftScreen={() => onCardLeftScreen('1')}
          preventSwipe={['up', 'down']}
        >
          <SwiperCard />
        </TinderCard>
        <TinderCard
          className="absolute z-0"
          onSwipe={(dir) => onSwipe(dir, 2)}
          onCardLeftScreen={() => onCardLeftScreen('2')}
          preventSwipe={['up', 'down']}
        >
          <SwiperCard />
        </TinderCard>
      </div>
    </>
  )
}
