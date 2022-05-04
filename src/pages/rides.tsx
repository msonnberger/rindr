import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { RequestsByDate, RequestsJoinRides } from 'src/types/main'
import { formatTimestamp, printDate, printDatePreview } from '@utils/functions'
import { supabase } from '@utils/supabaseClient'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import RideRequestContainer from '@components/RideRequestContainer'

// eslint-disable-next-line react/prop-types
const Rides: NextPage<{ requestsByDate: RequestsByDate }> = ({ requestsByDate }) => {
  const { data: session } = useSession()
  const [rideRequests, setRideRequests] = useState(requestsByDate)

  useEffect(() => {
    updatePreviews()
  }, [rideRequests])

  async function updatePreviews() {
    const newPreviews = await fetchPreviews(session?.user.id as string)
    const requestsByDate = newPreviews.reduce((dateGroups, request) => {
      const dateString = formatTimestamp(request.arrival)

      return {
        ...dateGroups,
        [dateString]: [...(dateGroups[dateString] || []), request],
      }
    }, {} as RequestsByDate)
    setRideRequests(requestsByDate)
  }

  return (
    <>
      <Head>
        <title>Rides</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Rides" color={fgStylings.Orange} marginTop="mt-10" />
        <div className="flex flex-col gap-4">
          {rideRequests &&
            Object.keys(rideRequests).map((date) => (
              <Fragment key={date}>
                <p className="mb-2 flex font-bold text-lg text-slate-900 mt-4">
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
      </Layout>
    </>
  )
}
export default Rides

async function fetchPreviews(userId: string): Promise<RequestsJoinRides[]> {
  const { data, error } = await supabase
    .from<RequestsJoinRides>('requests_join_rides')
    .select('*')
    .eq('driver_id', userId)
    .order('arrival', { ascending: false })
    .order('first_name', { ascending: true })

  if (error) {
    throw error
  }

  if (!data) {
    throw new Error()
  }
  return data
}

export const getServerSideProps: GetServerSideProps = async () => {
  const user = { id: '4b824c28-6ac4-45ff-b175-56624c287706' }
  //TODO: richtigen User verwenden
  const initialPreviews = await fetchPreviews(user.id)

  const requestsByDate = initialPreviews.reduce((dateGroups, request) => {
    const dateString = printDatePreview(new Date(formatTimestamp(request.arrival)))

    return {
      ...dateGroups,
      [dateString]: [...(dateGroups[dateString] || []), request],
    }
  }, {} as RequestsByDate)

  return { props: { requestsByDate } }
}
