import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProfileInfos } from 'src/pages/find-ride'
import { Slate } from '@styles/colors'
import SwiperUserInfo from './SwiperUserInfo'

interface SwiperProfileProps {
  profileInfos: ProfileInfos
  setOpenend: any
}
export default function SwiperProfile({ profileInfos, setOpenend }: SwiperProfileProps) {
  return (
    <div className="absolute top-4 left-0 h-full w-full z-10 p-4 rounded-3xl">
      <div className="h-[500px] bg-sky-400 rounded-3xl p-4 relative">
        <button
          className="bg-slate-50 h-10 w-10 rounded-3xl flex items-center justify-center bg-slate-50 bg-opacity-50"
          onClick={() => setOpenend(undefined)}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" color={Slate[800]} />
        </button>
        Mapholder
        <div className="absolute bg-slate-50 bg-opacity-50 h-20 bottom-0 rounded-3xl mb-2 left-2 right-2 p-3 flex flex-row justify-between items-center">
          <SwiperUserInfo
            pictureUrl={profileInfos.pictureUrl}
            department={profileInfos.department}
            firstName={profileInfos.firstName}
            lastName={profileInfos.lastName}
            thumbsUpCount={profileInfos.thumbsUpCount}
            thumbsDownCount={profileInfos.thumbsDownCount}
          />
        </div>
      </div>
    </div>
  )
}
