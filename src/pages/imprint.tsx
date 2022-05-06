import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Emerald, fgStylings } from '@styles/colors'
import FHLogoText from '@components/FHLogoText'
import Heading from '@components/Heading'
import ImpressumSection from '@components/ImpressumSection'
import Layout from '@components/Layout'

const Imprint: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Imprint</title>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <Layout>
        <div className="p-4">
          <button onClick={() => router.back()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              size="lg"
              color={Emerald[400]}
              className="cursor-pointer"
            />
          </button>
          <Heading title="Imprint" color={fgStylings.Emerald} marginTop="mt-8" />
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
            <ul className="leading-7 mb-8">
              <li>
                <a href="mailto:jmohr.mmt-b2020@fh-salzburg.ac.at">
                  jmohr.mmt-b2020@fh-salzburg.ac.at
                </a>
              </li>
              <li>
                <a href="mailto:mhajek.mmt-b2020@fh-salzburg.ac.at">
                  mhajek.mmt-b2020@fh-salzburg.ac.at
                </a>
              </li>
              <li>
                <a href="msonnberger.mmt-b2020@fh-salzburg.ac.at">
                  msonnberger.mmt-b2020@fh-salzburg.ac.at
                </a>
              </li>
              <li>
                <a href="pgottschling.mmt-b2020@fh-salzburg.ac.at">
                  pgottschling.mmt-b2020@fh-salzburg.ac.at
                </a>
              </li>
            </ul>
          </ImpressumSection>
          <FHLogoText width={200} />
        </div>
      </Layout>
    </>
  )
}

export default Imprint
