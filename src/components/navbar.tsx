import { Emerald, Sky, Slate, Orange, Rose } from '../styles/colors'
import NavElement from './navElement'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCommentDots, faPiggyBank, faCarSide, faCircleUser } from '@fortawesome/free-solid-svg-icons'

const bgStylings = {
    Slate: 'flex flex-row justify-between bg-slate-300 h-10 rounded-3xl items-center px-3 gap-4',
    Sky: 'flex flex-row justify-between bg-sky-100 h-10 rounded-3xl items-center px-3 gap-4',
    Emerald: 'flex flex-row justify-between bg-emerald-100 h-10 rounded-3xl items-center px-3 gap-4',
    Orange: 'flex flex-row justify-between bg-orange-100 h-10 rounded-3xl items-center px-3 gap-4',
    Rose: 'flex flex-row justify-between bg-rose-100 h-10 rounded-3xl items-center px-3 gap-4',
  }

  const fgStylings = {
    Slate: 'text-slate-50 font-sans font-bold text-xs mr-3',
    Sky: 'text-sky-400 font-sans font-bold text-xs mr-3',
    Emerald: 'text-emerald-400 font-sans font-bold text-xs mr-3',
    Orange: 'text-orange-400 font-sans font-bold text-xs mr-3',
    Rose: 'text-rose-400 font-sans font-bold text-xs mr-3'
  }

export default function Navbar() {
  const router = useRouter()
  const [currentRoute] = useState(router.pathname)
  
  
  return (
    <div className={"flex flex-row justify-evenly w-full bg-slate-50 h-16 rounded-3xl items-center"}>
      <NavElement title={"Home"} bgColor={bgStylings.Slate} fgColor={fgStylings.Slate} route={"/"} isActive={currentRoute === "/"}>
          <FontAwesomeIcon size={"lg"} icon={faHouse} color={currentRoute === "/" ? Slate[50] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Chat"} bgColor={bgStylings.Sky} fgColor={fgStylings.Sky} route={"/chat"} isActive={currentRoute === "/chat"}>
        <FontAwesomeIcon size={"lg"} icon={faCommentDots} color={currentRoute === "/chat" ? Sky[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Savings"} bgColor={bgStylings.Emerald} fgColor={fgStylings.Emerald} route={"/savings"} isActive={currentRoute === "/savings"}>
        <FontAwesomeIcon size={"lg"} icon={faPiggyBank} color={currentRoute === "/savings" ? Emerald[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Rides"} bgColor={bgStylings.Orange} fgColor={fgStylings.Orange} route={"/rides"} isActive={currentRoute === "/rides"}>
        <FontAwesomeIcon size={"lg"} icon={faCarSide} color={currentRoute === "/rides" ? Orange[400] : Slate[300]}/>
      </NavElement>
      <NavElement title={"Profile"} bgColor={bgStylings.Rose} fgColor={fgStylings.Rose} route={"/profile"} isActive={currentRoute === "/profile"}>
        <FontAwesomeIcon size={"lg"} icon={faCircleUser} color={currentRoute === "/profile" ? Rose[400] : Slate[300]}/>
      </NavElement>
    </div>
  )
}