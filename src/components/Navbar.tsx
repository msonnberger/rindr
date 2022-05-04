import {
  faCarSide,
  faCircleUser,
  faCommentDots,
  faHouse,
  faPiggyBank,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { Emerald, Orange, Rose, Sky, Slate, bgStylings, fgStylings } from '@styles/colors'
import NavElement from './NavElement'

export default function Navbar() {
  const { pathname: currentRoute } = useRouter()

  return (
    <div className="fixed bottom-3 right-4 left-4 flex h-16 flex-row items-center justify-evenly rounded-3xl bg-slate-50 z-20">
      <NavElement
        title="Home"
        bgColor={bgStylings.Slate}
        fgColor={fgStylings.Slate}
        route="/"
        isActive={currentRoute === '/'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faHouse}
          color={currentRoute === '/' ? Slate[50] : Slate[300]}
        />
      </NavElement>
      <NavElement
        title="Chat"
        bgColor={bgStylings.Sky}
        fgColor={fgStylings.Sky}
        route="/chat"
        isActive={currentRoute === '/chat' || currentRoute === '/new-chat'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faCommentDots}
          color={currentRoute === '/chat' || currentRoute === '/new-chat' ? Sky[400] : Slate[300]}
        />
      </NavElement>
      <NavElement
        title="Savings"
        bgColor={bgStylings.Emerald}
        fgColor={fgStylings.Emerald}
        route="/savings"
        isActive={currentRoute === '/savings'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faPiggyBank}
          color={currentRoute === '/savings' ? Emerald[400] : Slate[300]}
        />
      </NavElement>
      <NavElement
        title="Rides"
        bgColor={bgStylings.Orange}
        fgColor={fgStylings.Orange}
        route="/rides"
        isActive={currentRoute === '/rides'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faCarSide}
          color={currentRoute === '/rides' ? Orange[400] : Slate[300]}
        />
      </NavElement>
      <NavElement
        title="Profile"
        bgColor={bgStylings.Rose}
        fgColor={fgStylings.Rose}
        route="/profile"
        isActive={currentRoute === '/profile'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faCircleUser}
          color={currentRoute === '/profile' ? Rose[400] : Slate[300]}
        />
      </NavElement>
    </div>
  )
}
