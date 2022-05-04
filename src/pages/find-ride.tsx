import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Sky, fgStylings } from '@styles/colors'
import FindRideForm from '@components/FindRideForm'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import { SwiperContainer } from '@components/SwiperContainer'
import SwiperProfile from '@components/SwiperProfile'

export interface ProfileInfos {
  firstName: string
  lastName: string
  department: string | undefined
  thumbsUpCount: number
  thumbsDownCount: number
  pictureUrl: string
  bio: string
  interests: string[]
  music: string
}

const FindRide: NextPage = () => {
  const [openFilter, setOpenFilter] = useState(true)
  const [openedProfile, setOpenedProfile] = useState<ProfileInfos | undefined>(undefined)
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState([])

  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  useEffect(() => {
    console.log(location, 'from')
    console.log(destination, 'to')
    console.log(date, 'date')
  }, [destination, date, location])
  return (
    <>
      <Head>
        <title>Find Ride</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        {openedProfile && (
          <SwiperProfile profileInfos={openedProfile} setOpenend={setOpenedProfile} />
        )}
        {!openedProfile && (
          <>
            <div className="relative">
              <button onClick={() => handleBack()} className="w-min">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  size="lg"
                  color={Sky[400]}
                  className="cursor-pointer absolute"
                />
              </button>
              <Heading title="Find Ride" color={fgStylings.Sky} marginTop="mt-10" />
              {openFilter && (
                <FindRideForm
                  setDate={setDate}
                  setDestination={setDestination}
                  setLocation={setLocation}
                  setOpenFilter={setOpenFilter}
                />
              )}
              {!openFilter && (
                <SwiperContainer
                  setOpenedProfile={setOpenedProfile}
                  setOpenFilter={setOpenFilter}
                />
              )}
            </div>
          </>
        )}
      </Layout>
    </>
  )
}

export default FindRide
