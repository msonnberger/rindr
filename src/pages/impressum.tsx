import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import Layout from '@components/Layout'

const Savings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Savings</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <Heading title="Impressum" color={fgStylings.Emerald} marginTop="mt-10" />
        <p className="mt-3">
          This website was created by Team Rindr with the members: Juliane Mohr, Maximilian Hajek,
          Martin Sonnberger and Pascal Gottschling as Multimediaproject 2b for FH Salzburg.
        </p>
        <h3 className="mb-3 mt-2 text-left font-bold">Rights</h3>
        <p>
          With regard to your data stored by us, you have the right to information, correction,
          deletion, restriction, Data portability, revocation and objection. If you believe that the
          processing of your data violates violates data protection law or your data protection
          claims have otherwise been violated in a way, you can complain to the above email address
          or your data protection authority.
        </p>

        <h3 className="mb-3 mt-2 text-left font-bold">Icons</h3>
        <p>
          The Icons we used are from
          <a href="https://fontawesome.com/search?s=solid%2Cbrands">Fontawesome</a>.
        </p>

        <h3 className="mb-3 mt-2 text-left font-bold">Icons</h3>
        <p>
          The Icons we used are from
          <a href="https://fontawesome.com/search?s=solid%2Cbrands">Fontawesome</a>.
        </p>
        <h3 className="mb-3 mt-2 text-left font-bold">Contact</h3>
        <p>
          jmohr.mmt-b2020@fh-salzburg.ac.at mhajek.mmt-b2020@fh-salzburg.ac.at
          msonnberger.mmt-b2020@fh-salzburg.ac.at pgottschling.mmt-b2020@fh-salzburg.ac.at
        </p>
      </Layout>
    </>
  )
}

export default Savings
