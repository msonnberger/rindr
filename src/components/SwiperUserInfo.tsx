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
        withArrow ? 'h-24' : 'h-22'
      } bg-slate-50 bg-opacity-50 rounded-3xl p-3 flex flex-col backdrop-blur-sm`}
    >
      <div className="flex-row flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <p className="font-bold text-2xl text-slate-800 overflow-hidden overflow-ellipsis">
            {firstName} {lastName}
          </p>
          <div className="flex flex-nowrap whitespace-nowrap gap-3 max-w-[360px]">
            <div className="bg-orange-400 rounded-3xl pl-4 pr-4 py-1 flex items-center max-w-[360px]">
              <FontAwesomeIcon icon={faHeadphones} color="white" />
              <p className="text-white font-bold ml-4 max-w-[16rem] overflow-hidden overflow-ellipsis">
                {music}
              </p>
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
        <FontAwesomeIcon icon={faChevronDown} color={Slate[500]} size="lg" className="-mt-3" />
      )}
    </div>
  )
}
