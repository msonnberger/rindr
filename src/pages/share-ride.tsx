import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Emerald, fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import ShareRideForm from '@components/ShareRideForm'

const ShareRide: NextPage = () => {
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
        <title>Share Ride</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="relative">
          <button onClick={() => handleBack()} className="w-min">
            <FontAwesomeIcon
              icon={faAngleLeft}
              size="lg"
              color={Emerald[400]}
              className="cursor-pointer absolute"
            />
          </button>
          <Heading title="Share Ride" color={fgStylings.Emerald} marginTop="mt-10" />
          <ShareRideForm
            setDate={setDate}
            setDestination={setDestination}
            setLocation={setLocation}
          />
        </div>
      </Layout>
    </>
  )
}

export default ShareRide
