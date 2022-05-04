import type { NextPage } from 'next'
import type { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { RequestsJoinRides } from 'src/types/main'
import { supabase } from '@utils/supabaseClient'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import RideRequestContainer from '@components/RideRequestContainer'

// eslint-disable-next-line react/prop-types
const Rides: NextPage<{ initialPreviews: RequestsJoinRides[] }> = ({ initialPreviews }) => {
  const { data: session } = useSession()
  const [rideRequests, setRideRequests] = useState(initialPreviews)

  useEffect(() => {
    updatePreviews()
  }, [rideRequests])

  async function updatePreviews() {
    const newPreviews = await fetchPreviews(session?.user.id as string)
    setRideRequests(newPreviews)
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
          {rideRequests.map((request, index) => {
            return (
              <RideRequestContainer
                updatePreviews={() => updatePreviews}
                RideRequest={request}
                key={index}
              />
            )
          })}
        </div>
      </Layout>
    </>
  )
}
//WHERE rides.driver_id = 'c670fb2f-fa9a-4ba1-9730-53d7d5147b2b'
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
  const initialPreviews = await fetchPreviews(user.id)

  return { props: { initialPreviews } }
}
