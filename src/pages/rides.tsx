import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { RequestsByDate, RequestsJoinRides, SupabaseRide } from 'src/types/main'
import { formatTimestamp, printDate, printDatePreview } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import RideRequestContainer from '@components/RideRequestContainer'
import ShareRideContainer from '@components/SharedRideContainer'

const Rides: NextPage<{
  requestsByDate: RequestsByDate
  sharedRides: SupabaseRide[]
  dataRideDates: SupabaseRide[]
}> = ({
  // eslint-disable-next-line react/prop-types
  requestsByDate,
  // eslint-disable-next-line react/prop-types
  sharedRides,
  // eslint-disable-next-line react/prop-types
  dataRideDates,
}) => {
  const { data: session } = useSession()
  const [rideRequests, setRideRequests] = useState(requestsByDate)
  const [sharedRidesData, setSharedRidesData] = useState(sharedRides)
  const [rideDates, setRideDates] = useState(dataRideDates)

  useEffect(() => {
    updatePreviews()
  }, [rideRequests, sharedRidesData])

  async function updatePreviews() {
    const newPreviews = await fetchPreviews(session?.user.id as string)
    const requests = newPreviews.rideRequests
    const sharedRides = newPreviews.sharedRides
    const fetchedRideDates = newPreviews.rideDates
    const requestsByDate = requests.reduce((dateGroups, request) => {
      const dateString = formatTimestamp(request.arrival)

      return {
        ...dateGroups,
        [dateString]: [...(dateGroups[dateString] || []), request],
      }
    }, {} as RequestsByDate)
    setRideRequests(requestsByDate)
    setSharedRidesData(sharedRides)
    setRideDates(fetchedRideDates)
  }

  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Rides" color={fgStylings.Orange} marginTop="mt-10" />
        <p className="flex font-bold text-2xl text-orange-600 mt-4">Ride Requests</p>
        <div className="flex flex-col gap-4">
          {rideRequests &&
            Object.keys(rideRequests).map((date) => (
              <Fragment key={date}>
                <p className="mb-2 flex font-bold text-lg text-slate-900 mt-2">
                  {printDate(new Date(date))}
                </p>
                <ul className="flex flex-col gap-7">
                  {rideRequests[date].map((request: RequestsJoinRides, index: number) => (
                    <RideRequestContainer
                      updatePreviews={() => updatePreviews}
                      RideRequest={request}
                      key={index}
                    />
                  ))}
                </ul>
              </Fragment>
            ))}
        </div>
        <p className="flex font-bold text-2xl mt-8 text-emerald-400">Shared rides</p>
        <div className="flex flex-col gap-4 mt-4">
          {sharedRidesData &&
            sharedRidesData.map((ride) => <ShareRideContainer key={ride.id} ride={ride} />)}
        </div>
        <p className="flex font-bold text-2xl mt-8 text-sky-400">Ride dates</p>
        {rideDates && rideDates.map((rideDate) => <div key={rideDate.id}>{rideDate.id}</div>)}
      </Layout>
    </>
  )
}
export default Rides

async function fetchPreviews(userId: string): Promise<{
  rideRequests: RequestsJoinRides[]
  sharedRides: SupabaseRide[]
  rideDates: SupabaseRide[]
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
    .order('arrival', { ascending: false })

  const { data: dataRideDates, error: errorRideDates } = await supabase
    .from<SupabaseRide>('rides')
    .select('*')
    .eq('passenger_id', userId)
    .order('arrival', { ascending: false })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error()
  }

  if (errorSharedRides) {
    throw error
  }

  if (!dataSharedRides) {
    throw new Error()
  }

  if (errorRideDates) {
    throw error
  }

  if (!dataRideDates) {
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
    const dateString = printDatePreview(new Date(formatTimestamp(request.arrival)))

    return {
      ...dateGroups,
      [dateString]: [...(dateGroups[dateString] || []), request],
    }
  }, {} as RequestsByDate)

  return { props: { requestsByDate, sharedRides, dataRideDates } }
}
