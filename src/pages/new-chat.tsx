import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Sky } from '@styles/colors'
import Layout from '@components/layout'

const NewChat: NextPage = () => {
  return (
    <>
      <Head>
        <title>New Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Link href="/chat" passHref>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" color={Sky[400]} className="cursor-pointer" />
        </Link>
      </Layout>
    </>
  )
}

export default NewChat
