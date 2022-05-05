import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FindRideResponse, User } from 'src/types/main'
import { Sky, fgStylings } from '@styles/colors'
import FindRideForm from '@components/FindRideForm'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import { SwiperContainer } from '@components/SwiperContainer'
import SwiperProfile from '@components/SwiperProfile'

const FindRide: NextPage = () => {
  const [openFilter, setOpenFilter] = useState(true)
  const [openedProfile, setOpenedProfile] = useState<Partial<User> & { mapUrl: string }>()
  const [swiperCards, setSwiperCards] = useState<FindRideResponse[]>([])

  const router = useRouter()

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
          <div className="relative">
            <button onClick={() => router.back()} className="w-min">
              <FontAwesomeIcon
                icon={faAngleLeft}
                size="lg"
                color={Sky[400]}
                className="cursor-pointer absolute"
              />
            </button>
            <Heading title="Find Ride" color={fgStylings.Sky} marginTop="mt-10" />
            {openFilter && (
              <FindRideForm setOpenFilter={setOpenFilter} setSwiperCards={setSwiperCards} />
            )}
            {!openFilter && (
              <SwiperContainer
                swiperCards={swiperCards}
                setOpenedProfile={setOpenedProfile}
                setOpenFilter={setOpenFilter}
              />
            )}
          </div>
        )}
      </Layout>
    </>
  )
}

export default FindRide
