import type { NextPage } from 'next'
import Head from 'next/head'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'
import ImpressumSection from '@components/ImpressumSection'
import Layout from '@components/Layout'

const Savings: NextPage = () => {
  return (
    <>
      <Head>
        <title>Savings</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="p-4">
          <Heading title="Impressum" color={fgStylings.Emerald} marginTop="mt-10" />
          <p className="mt-6">
            This website was created by Team Rindr with the members: Juliane Mohr, Maximilian Hajek,
            Martin Sonnberger and Pascal Gottschling as Multimediaproject 2b for FH Salzburg.
          </p>
          <ImpressumSection header="Rights">
            <p>
              With regard to your data stored by us, you have the right to information, correction,
              deletion, restriction, Data portability, revocation and objection. If you believe that
              the processing of your data violates violates data protection law or your data
              protection claims have otherwise been violated in a way, you can complain to the above
              email address or your data protection authority.
            </p>
          </ImpressumSection>

          <ImpressumSection header="Icons">
            <p>
              The Icons we used are from
              <a
                className="text-emerald-500 font-bold"
                href="https://fontawesome.com/search?s=solid%2Cbrands"
              >
                {' '}
                Fontawesome
              </a>
              .
            </p>
          </ImpressumSection>

          <ImpressumSection header="Contact">
            <ul>
              <li>jmohr.mmt-b2020@fh-salzburg.ac.at</li>
              <li>mhajek.mmt-b2020@fh-salzburg.ac.at</li>
              <li>msonnberger.mmt-b2020@fh-salzburg.ac.at</li>
              <li>pgottschling.mmt-b2020@fh-salzburg.ac.at</li>
            </ul>
          </ImpressumSection>
        </div>
      </Layout>
    </>
  )
}

export default Savings
