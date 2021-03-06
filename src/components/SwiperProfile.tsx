import { faArrowLeft, faHeadphones } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from 'src/types/main'
import { Slate } from '@styles/colors'
import Image from './Image'
import SwiperUserInfo from './SwiperUserInfo'
import Tag from './Tag'

interface SwiperProfileProps {
  profileInfos: Partial<User> & { mapUrl: string }
  setOpenend: any
}

export default function SwiperProfile({ profileInfos, setOpenend }: SwiperProfileProps) {
  return (
    <div className="relative z-10 rounded-3xl h-auto max-w-[450px] flex flex-col left-0 right-0">
      <div className="h-[500px] rounded-3xl p-4 relative">
        <Image
          src={profileInfos.mapUrl}
          alt="Image of map with route"
          className="absolute top-0 left-0 rounded-3xl h-[500px] w-full"
        />

        <button
          className="h-10 w-10 rounded-3xl flex items-center justify-center bg-slate-50 bg-opacity-50 absolute"
          onClick={() => setOpenend(undefined)}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" color={Slate[800]} />
        </button>
        <div className="absolute bottom-0 mb-2 left-2 right-4">
          <SwiperUserInfo
            pictureUrl={profileInfos.pictureUrl}
            firstName={profileInfos.firstName}
            lastName={profileInfos.lastName}
            music={profileInfos.music}
            withArrow={false}
          />
        </div>
      </div>
      <div className="bg-slate-50 rounded-3xl p-4 mt-4">
        <p className="font-light">{profileInfos.bio}</p>
      </div>
      <section id="profile-informations" className="ml-4">
        <p className="mb-3 text-left font-bold mt-4">Interests</p>
        <div className="flex flex-wrap gap-3">
          {profileInfos.interests &&
            profileInfos.interests.map((tag, key) => (
              <Tag key={key} text={tag} className="pl-4 pr-4 py-2" />
            ))}
        </div>
        <p className="mb-3 text-left font-bold mt-4">Music</p>
        <div className="flex flex-row min-h-[120px]">
          <div className="bg-orange-400 h-7 w-8 rounded-full flex justify-center items-center">
            <FontAwesomeIcon icon={faHeadphones} color="white" size="1x" />
          </div>
          <p className="font-light ml-3 overflow-hidden overflow-ellipsis whitespace-nowrap mr-3">
            {profileInfos.music}
          </p>
        </div>
      </section>
    </div>
  )
}
