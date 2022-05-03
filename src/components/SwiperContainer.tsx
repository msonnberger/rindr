import { faRoute } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SwiperContainerProps {
  setOpenFilter: any
}
export const SwiperContainer = ({ setOpenFilter }: SwiperContainerProps) => {
  return (
    <>
      <button
        className="rounded-3xl flex items-center justify-center bg-sky-400 py-2 pl-4 pr-4 text-white fit-content w-max absolute right-0 top-16"
        onClick={() => setOpenFilter(true)}
      >
        <FontAwesomeIcon icon={faRoute} size="lg" />
        <p className="ml-3 font-bold">Filter</p>
      </button>
    </>
  )
}
