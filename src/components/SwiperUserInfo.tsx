import { faChevronDown, faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Slate } from '@styles/colors'
import Image from '@components/Image'

interface SwiperUserInfoProps {
  firstName: string | undefined
  lastName: string | undefined
  pictureUrl: string | undefined
  music: string | undefined
  withArrow: boolean
}
export default function SwiperUserInfo({
  firstName,
  lastName,
  pictureUrl,
  withArrow,
  music,
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
          <div className="flex flex-nowrap fit-content overflow-hidden whitespace-nowrap gap-3 max-w-[360px]">
            <div className="bg-orange-400 rounded-3xl pl-4 pr-4 py-1 flex items-center max-w-[360px]">
              <FontAwesomeIcon icon={faHeadphones} color="white" />
              <p className="text-white font-bold ml-4 max-w-[120px] overflow-ellipsis">{music}</p>
            </div>
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
      {withArrow && (
        <FontAwesomeIcon icon={faChevronDown} color={Slate[800]} size="lg" className="mt-1" />
      )}
    </div>
  )
}
