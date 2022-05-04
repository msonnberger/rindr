import { faChevronDown, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Emerald, Orange, Slate } from '@styles/colors'
import Image from '@components/Image'

interface SwiperUserInfoProps {
  firstName: string | undefined
  lastName: string | undefined
  department: string | undefined
  thumbsUpCount: number | undefined
  thumbsDownCount: number | undefined
  pictureUrl: string | undefined
  withArrow: boolean
}
export default function SwiperUserInfo({
  firstName,
  lastName,
  department,
  thumbsUpCount,
  thumbsDownCount,
  pictureUrl,
  withArrow,
}: SwiperUserInfoProps) {
  return (
    <div
      className={`${
        withArrow ? 'h-24' : 'h-20'
      } bg-slate-50 bg-opacity-50 rounded-3xl p-3 flex flex-col`}
    >
      <div className="flex-row flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold text-2xl text-slate-800">
            {firstName} {lastName}
          </p>
          <p className="font-light text-slate-800">{department}</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-slate-200 rounded-2xl flex items-center justify-between pl-2 pr-2 gap-2">
            <FontAwesomeIcon icon={faThumbsUp} color={Emerald[500]} />
            <p className="font-light">{thumbsUpCount ? thumbsUpCount : '0'}</p>
          </div>
          <div className="bg-slate-200 rounded-2xl flex items-center justify-between pl-2 pr-2 gap-2">
            <FontAwesomeIcon icon={faThumbsDown} color={Orange[500]} />
            <p className="font-light">{thumbsDownCount ? thumbsDownCount : '0'}</p>
          </div>
        </div>
        {pictureUrl && (
          <Image
            src={pictureUrl}
            alt={`Profile picture of ${firstName} ${lastName}`}
            className="rounded-full h-14 w-14 object-cover"
          />
        )}
      </div>
      {withArrow && <FontAwesomeIcon icon={faChevronDown} color={Slate[500]} className="mt-1" />}
    </div>
  )
}