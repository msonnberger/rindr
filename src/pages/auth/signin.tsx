import { NextPageContext } from 'next'
import { signIn } from 'next-auth/react'
import { fgStylings } from '@styles/colors'
import Heading from '@components/Heading'

interface SignInProps {
  callbackUrl: string
}

export default function SignIn({ callbackUrl }: SignInProps) {
  return (
    <main className="flex items-center justify-around flex-col min-h-screen">
      <div className="mb-20">
        <Heading title="Welcome to Rindr!" color={fgStylings.Sky} marginTop="mt-10" />
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" width="394" height="394" viewBox="0 0 394 394">
        <g id="Gruppe_4" data-name="Gruppe 4" transform="translate(-1490 -63)">
          <circle
            id="Ellipse_16"
            data-name="Ellipse 16"
            cx="197"
            cy="197"
            r="197"
            transform="translate(1490 63)"
            fill="#38bdf8"
          />
          <path
            id="Schnittmenge_6"
            data-name="Schnittmenge 6"
            d="M136.039,300.613,236.912,145.624l15.642-74,139.88,139.546c-6.795,89.794-74.3,162.669-161.682,177.887Z"
            transform="translate(1490.566 64)"
            fill="#0ea5e9"
          />
          <path
            id="Pfad_29"
            data-name="Pfad 29"
            d="M590.331,421.734a72.006,72.006,0,0,0,19.75-17.942c8.193-11.278,13.02-27.17,13.02-27.17s10.568,14.644,10.568,29.994S623.1,441.211,623.1,441.211Z"
            transform="translate(1120.146 -242)"
            fill="#475569"
          />
          <path
            id="Pfad_30"
            data-name="Pfad 30"
            d="M633.669,421.734a72.007,72.007,0,0,1-19.75-17.942c-8.193-11.278-13.02-27.17-13.02-27.17s-10.568,14.644-10.568,29.994S600.9,441.211,600.9,441.211Z"
            transform="translate(1029.169 -242)"
            fill="#475569"
          />
          <path
            id="Pfad_31"
            data-name="Pfad 31"
            d="M622,435.911a25.717,25.717,0,0,1,11.466-11.825c8.425-4.351,22.235-5.578,22.235-5.578s4.651,20.475-3.775,32.226S622,465.512,622,465.512Z"
            transform="translate(1121.011 -234)"
            fill="#fed7aa"
          />
          <path
            id="Pfad_32"
            data-name="Pfad 32"
            d="M656.98,435.911a25.717,25.717,0,0,0-11.466-11.825c-8.425-4.351-22.235-5.578-22.235-5.578s-4.651,20.475,3.775,32.226,29.927,14.779,29.927,14.779Z"
            transform="translate(971.52 -236)"
            fill="#fed7aa"
          />
          <path
            id="Pfad_33"
            data-name="Pfad 33"
            d="M1269.99,494.8l7.963-102.988s-.937-20.2-12.348-31.818-15.582-10.987-33.3-14.65c-9.175-1.9-29.009-1.765-37.557,0-17.734,3.662-21.938,3.033-33.38,14.65s-12.39,31.818-12.39,31.818l8.052,102.988Z"
            transform="translate(473.531 -168.802)"
            fill="#fff"
          />
          <rect
            id="Rechteck_3"
            data-name="Rechteck 3"
            width="134.315"
            height="64"
            rx="27"
            transform="translate(1619.5 310)"
            fill="#fed7aa"
          />
          <path
            id="Schnittmenge_7"
            data-name="Schnittmenge 7"
            d="M55.825,81.528s.947-20.2,12.389-31.818,15.646-10.987,33.38-14.649a91.705,91.705,0,0,1,14.565-1.317A44.71,44.71,0,0,0,113.8,52.9c1.092,10.569,1.787,8.189,0,14.723s.068,12.684-7.153,11.414-8.594-5.083-15.757-5.083-2.941,9.58-8.037,16.8-7.322,3.188-12.343,12.092c-4.506,7.991-10.395,16.9-11.556,18.641Z"
            transform="translate(1566.54 141.426)"
            fill="#64748b"
          />
          <circle
            id="Ellipse_18"
            data-name="Ellipse 18"
            cx="8.5"
            cy="8.5"
            r="8.5"
            transform="translate(1652 251)"
            fill="#475569"
          />
          <circle
            id="Ellipse_19"
            data-name="Ellipse 19"
            cx="8.5"
            cy="8.5"
            r="8.5"
            transform="translate(1706 251)"
            fill="#475569"
          />
          <circle
            id="Ellipse_20"
            data-name="Ellipse 20"
            cx="9.5"
            cy="9.5"
            r="9.5"
            transform="translate(1651 337)"
            fill="#fb923c"
          />
          <circle
            id="Ellipse_21"
            data-name="Ellipse 21"
            cx="9.5"
            cy="9.5"
            r="9.5"
            transform="translate(1705 337)"
            fill="#fb923c"
          />
        </g>
      </svg>

      <button
        onClick={() => signIn('fhs', { callbackUrl: callbackUrl })}
        className="cursor-pointer rounded-full bg-rose-500 py-3 px-5 font-semibold text-rose-50"
      >
        Sign in with FH Salzburg
      </button>
    </main>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { callbackUrl } = context.query
  return {
    props: { callbackUrl },
  }
}
