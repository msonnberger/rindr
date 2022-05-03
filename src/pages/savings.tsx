import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { plural } from '@utils/i18n'
import { fgStylings } from '@styles/colors'
import Bubble from '@components/Bubble'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

const Savings: NextPage = () => {
  const { data: session } = useSession()
  const t = (text: string) => text
  // session.user

  return (
    <>
      <Head>
        <title>Savings</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Bubble
          color="bg-emerald-50"
          text="Congratulations, you just reached the second place!"
          path="/car.svg"
          alt="car"
        />
        <Heading title="Savings" color={fgStylings.Emerald} marginTop="mt-10" />
        {session && (
          <p>
            You saved <br />
            <span className={`text-4xl font-bold ${fgStylings.Emerald}`}>
              {session?.user.savingsCo2}kg
            </span>
            <br />
            in CO2 this month! This is the same amount as{' '}
            <span className={`font-bold`}>
              {plural(session?.user.savingsCo2 ? ~~(session?.user.savingsCo2 / 26.5) : 0, 'tree')}
            </span>{' '}
            {''} can absorb in one year.
          </p>
        )}
      </Layout>
    </>
  )
}

export default Savings
