import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { ProfileInfos } from 'src/pages/find-ride'
import { getRandomInt } from '@utils/functions'
import { Rose, Slate } from '@styles/colors'
import SwiperUserInfo from './SwiperUserInfo'
import { TagsInput } from './inputs'

interface SwiperProfileProps {
  profileInfos: ProfileInfos
  setOpenend: any
}
export default function SwiperProfile({ profileInfos, setOpenend }: SwiperProfileProps) {
  const randomColor = () => {
    const random = getRandomInt(1, 9) * 100
    const textColor = random < 500 ? Rose[900] : Rose[50]
    // @ts-ignore
    return { bgColor: Rose[random], textColor: textColor }
  }
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
        <div className="absolute bottom-0 mb-2 left-2 right-2">
          <SwiperUserInfo
            pictureUrl={profileInfos.pictureUrl}
            department={profileInfos.department}
            firstName={profileInfos.firstName}
            lastName={profileInfos.lastName}
            thumbsUpCount={profileInfos.thumbsUpCount}
            thumbsDownCount={profileInfos.thumbsDownCount}
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
            profileInfos.interests.map((tag, key) => {
              const { bgColor, textColor } = randomColor()
              return (
                <div
                  key={key}
                  className="group relative flex gap-4 rounded-full bg-slate-100 pl-4 pr-4 py-2"
                  style={{ backgroundColor: bgColor, color: textColor }}
                >
                  <p className="text-white">{tag}</p>
                </div>
              )
            })}
        </div>
      </section>
    </div>
  )
}
