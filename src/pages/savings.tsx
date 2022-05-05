import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { convertPlural, convertRanking } from '@utils/i18n'
import { supabase } from '@utils/supabaseClient'
import { fgStylings } from '@styles/colors'
import HeaderBubble from '@components/HeaderBubble'
import Heading from '@components/Heading'
import Layout from '@components/Layout'
import SocialShareButton from '@components/SocialShareButton'

const Savings: NextPage = () => {
  const { data: session } = useSession()
  const [ranking, SetRanking] = useState('')

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    const { count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .gte('savings_co2', session?.user.savingsCo2)

    SetRanking(convertRanking(count ?? 0))
  }

  return (
    <>
      {ranking && (
        <>
          <Head>
            <title>Savings</title>
            <link rel="icon" href="/logo.svg" />
          </Head>
          <Layout>
            <HeaderBubble
              color="bg-emerald-50"
              text={`Congratulations, you just reached the ${ranking} place!`}
              path="/car.svg"
              alt="car"
            />
            <Heading title="Savings" color={fgStylings.Emerald} marginTop="mt-10" />
            <div className="flex flex-col">
              <div className="flex justify-center mt-8">
                <Image src="/savings.svg" alt="savings-icon" width="250" height="250" />
              </div>
              <div className="">
                <p className="mt-6 mb-3">
                  <span className="font-bold">You</span> saved
                </p>
                <span className={`text-4xl font-bold mb-2 ${fgStylings.Emerald}`}>
                  {session?.user.savingsCo2}kg
                </span>
                <p className="mt-3">
                  in CO2 this month! This is the same amount as{' '}
                  <span className="font-bold">
                    {convertPlural(
                      session?.user.savingsCo2 ? ~~(session?.user.savingsCo2 / 26.5) : 0,
                      'tree'
                    )}
                  </span>{' '}
                  can absorb in one year.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <SocialShareButton
                color="bg-emerald-600"
                textColor="white"
                url="https://twitter.com/intent/tweet?text="
                text={`I saved ${session?.user.savingsCo2}kg in CO2 this month on Rindr!`}
                description="Share on Twitter"
              />
            </div>
          </Layout>
        </>
      )}
    </>
  )
}

export default Savings
