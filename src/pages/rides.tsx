import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { RequestsByDate, RequestsJoinRides, SupabaseRide } from 'src/types/main'
import { formatDateRides, formatTimestamp } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import { Emerald, Orange, Sky, fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import RideDateContainer from '@components/RideDateContainer'
import RideRequestContainer from '@components/RideRequestContainer'
import SharedRideContainer from '@components/SharedRideContainer'
import ToggleButton from '@components/ToggleButton'

const Rides: NextPage<{
  requestsByDate: RequestsByDate
  sharedRides: SupabaseRide[]
  rideDatesByDate: RequestsByDate
}> = ({
  requestsByDate, // eslint-disable-line react/prop-types
  sharedRides, // eslint-disable-line react/prop-types
  rideDatesByDate, // eslint-disable-line react/prop-types
}) => {
  const { data: session } = useSession()
  const [rideRequests, setRideRequests] = useState(requestsByDate)
  const [sharedRidesData, setSharedRidesData] = useState(sharedRides)

  const [openedRideRequests, setOpenedRideRequests] = useState(true)
  const [openedSharedRides, setOpenedSharedRides] = useState(false)
  const [openedRideDates, setOpenedRideDates] = useState(false)

  async function updatePreviews() {
    const newPreviews = await fetchPreviews(session?.user.id as string)
    const requests = newPreviews.rideRequests
    const sharedRides = newPreviews.sharedRides

    const requestsByDate = requests.reduce((dateGroups, request) => {
      const dateString = formatTimestamp(request.arrival)

      return {
        ...dateGroups,
        [dateString]: [...(dateGroups[dateString] || []), request],
      }
    }, {} as RequestsByDate)

    setRideRequests(requestsByDate)
    setSharedRidesData(sharedRides)
  }

  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Rides" color={fgStylings.Orange} marginTop="mt-10 mb-8" />
        <ToggleButton
          text="Ride Requests"
          bgColor="bg-orange-100"
          openend={openedRideRequests}
          textColor="text-orange-600"
          buttonColor={Orange[600]}
          onClick={() => setOpenedRideRequests(!openedRideRequests)}
        />
        {openedRideRequests && (
          <div className="flex flex-col gap-4 mt-4 mb-4">
            {rideRequests && Object.keys(rideRequests).length > 0 ? (
              Object.keys(rideRequests).map((date) => (
                <Fragment key={date}>
                  <p className="flex font-bold text-lg text-slate-900 mt-2 ml-4">
                    {formatDateRides(new Date(date))}
                  </p>
                  <ul className="flex flex-col gap-7">
                    {rideRequests[date].map((request: RequestsJoinRides, index: number) => (
                      <RideRequestContainer
                        updatePreviews={updatePreviews}
                        RideRequest={request}
                        key={index}
                      />
                    ))}
                  </ul>
                </Fragment>
              ))
            ) : (
              <p className="text-orange-500 mt-4 text-lg ml-4">
                You have no incoming ride requests...
              </p>
            )}
          </div>
        )}

        <ToggleButton
          text="Shared rides"
          bgColor="bg-emerald-100"
          openend={openedSharedRides}
          textColor="text-emerald-600"
          buttonColor={Emerald[600]}
          onClick={() => setOpenedSharedRides(!openedSharedRides)}
        />
        {openedSharedRides && (
          <div className="flex flex-col gap-4 mt-4 mb-4">
            {sharedRidesData && sharedRidesData.length > 0 ? (
              sharedRidesData.map((ride) => (
                <SharedRideContainer key={ride.id} ride={ride} updatePreviews={updatePreviews} />
              ))
            ) : (
              <p className="text-emerald-500 mt-4 text-lg ml-4">
                You shared no rides yet...
                <Link className="font-bold" href="/share-ride">
                  Click to share a new ride!
                </Link>
              </p>
            )}
          </div>
        )}

        <ToggleButton
          text="Ride dates"
          bgColor="bg-sky-100"
          openend={openedRideDates}
          textColor="text-sky-600"
          buttonColor={Sky[600]}
          onClick={() => setOpenedRideDates(!openedRideDates)}
        />
        {openedRideDates && (
          <div className="flex flex-col gap-4 mt-4 mb-4">
            {rideDatesByDate && Object.keys(rideDatesByDate).length > 0 ? (
              Object.keys(rideDatesByDate).map((date) => (
                <Fragment key={date}>
                  <p className="flex font-bold text-lg text-slate-900 mt-2  ml-4">
                    {formatDateRides(new Date(date))}
                  </p>
                  <ul className="flex flex-col gap-7">
                    {
                      // prettier-ignore
                      // eslint-disable-next-line react/prop-types
                      rideDatesByDate[date].map( (request) => (
                          <RideDateContainer key={request.ride_id} ride={request} />
                        )
                      )
                    }
                  </ul>
                </Fragment>
              ))
            ) : (
              <p className="text-sky-500 mt-4 text-lg ml-4">
                You have no ride dates yet...{' '}
                <Link href="/find-ride" className="font-bold">
                  Click to find a new ride!
                </Link>
              </p>
            )}
          </div>
        )}
      </Layout>
    </>
  )
}

export default Rides

async function fetchPreviews(userId: string): Promise<{
  rideRequests: RequestsJoinRides[]
  sharedRides: SupabaseRide[]
  rideDates: RequestsJoinRides[]
}> {
  const { data, error } = await supabase
    .from<RequestsJoinRides>('requests_join_rides')
    .select('*')
    .eq('driver_id', userId)
    .order('arrival', { ascending: false })
    .order('first_name', { ascending: true })

  const { data: dataSharedRides, error: errorSharedRides } = await supabase
    .from<SupabaseRide>('rides')
    .select('*')
    .eq('driver_id', userId)
    .order('arrival', { ascending: true })

  //view: requests_join_rides
  const { data: dataRideDates, error: errorRideDates } = await supabase
    .from<RequestsJoinRides>('requests_join_rides')
    .select('*')
    .eq('accepted_passenger_id', userId)
    .order('arrival', { ascending: true })

  if (error) {
    throw error
  }

  if (errorSharedRides) {
    throw error
  }

  if (errorRideDates) {
    throw error
  }

  if (!data || !dataSharedRides || !dataRideDates) {
    throw new Error()
  }

  return { rideRequests: data, sharedRides: dataSharedRides, rideDates: dataRideDates }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userData = await getSession(context)
  const user = userData?.user
  const initialPreviews = await fetchPreviews(user?.id as string)
  const requests = initialPreviews.rideRequests
  const sharedRides = initialPreviews.sharedRides
  const dataRideDates = initialPreviews.rideDates

  const requestsByDate = requests.reduce((dateGroups, request) => {
    const dateString = formatTimestamp(request.arrival)

    return {
      ...dateGroups,
      [dateString]: [...(dateGroups[dateString] || []), request],
    }
  }, {} as RequestsByDate)

  const rideDatesByDate = dataRideDates.reduce((dateGroups, request) => {
    const dateString = formatTimestamp(request.arrival)

    return {
      ...dateGroups,
      [dateString]: [...(dateGroups[dateString] || []), request],
    }
  }, {} as RequestsByDate)

  return { props: { requestsByDate, sharedRides, rideDatesByDate } }
}
