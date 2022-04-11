import { Emerald, Sky, Slate, Orange, Rose } from '../styles/colors'
import NavElement from './navElement'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCommentDots, faPiggyBank, faCarSide, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const bgStylings = {
  Slate: 'bg-slate-300',
  Sky: 'bg-sky-100',
  Emerald: 'bg-emerald-100',
  Orange: 'bg-orange-100',
  Rose: 'bg-rose-100',
}

const fgStylings = {
  Slate: 'text-slate-50 ',
  Sky: 'text-sky-400',
  Emerald: 'text-emerald-400',
  Orange: 'text-orange-400',
  Rose: 'text-rose-400',
}

export default function Navbar() {
  const { pathname: currentRoute } = useRouter()

  return (
    <div className="flex h-16 w-full flex-row items-center justify-evenly rounded-3xl bg-slate-50">
      <NavElement
        title="Home"
        bgColor={bgStylings.Slate}
        fgColor={fgStylings.Slate}
        route="/"
        isActive={currentRoute === '/'}
      >
        <FontAwesomeIcon size="lg" icon={faHouse} color={currentRoute === '/' ? Slate[50] : Slate[300]} />
      </NavElement>
      <NavElement
        title="Chat"
        bgColor={bgStylings.Sky}
        fgColor={fgStylings.Sky}
        route="/chat"
        isActive={currentRoute === '/chat'}
      >
        <FontAwesomeIcon size="lg" icon={faCommentDots} color={currentRoute === '/chat' ? Sky[400] : Slate[300]} />
      </NavElement>
      <NavElement
        title="Savings"
        bgColor={bgStylings.Emerald}
        fgColor={fgStylings.Emerald}
        route="/savings"
        isActive={currentRoute === '/savings'}
      >
        <FontAwesomeIcon size="lg" icon={faPiggyBank} color={currentRoute === '/savings' ? Emerald[400] : Slate[300]} />
      </NavElement>
      <NavElement
        title="Rides"
        bgColor={bgStylings.Orange}
        fgColor={fgStylings.Orange}
        route="/rides"
        isActive={currentRoute === '/rides'}
      >
        <FontAwesomeIcon size="lg" icon={faCarSide} color={currentRoute === '/rides' ? Orange[400] : Slate[300]} />
      </NavElement>
      <NavElement
        title="Profile"
        bgColor={bgStylings.Rose}
        fgColor={fgStylings.Rose}
        route="/profile"
        isActive={currentRoute === '/profile'}
      >
        <FontAwesomeIcon size="lg" icon={faCircleUser} color={currentRoute === '/profile' ? Rose[400] : Slate[300]} />
      </NavElement>
    </div>
  )
}
